import { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    platform: 'other',
    message: '',
    featured: false
  });
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/testimonials');
      setTestimonials(res.data);
    } catch (err) {
      toast.error('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (avatarFile) data.append('avatar', avatarFile);

    try {
      if (editingId) {
        await api.put(`/testimonials/${editingId}`, data);
        toast.success('Testimonial updated');
      } else {
        await api.post('/testimonials', data);
        toast.success('Testimonial created');
      }
      resetForm();
      fetchTestimonials();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (t) => {
    setEditingId(t._id);
    setFormData({
      name: t.name,
      handle: t.handle || '',
      platform: t.platform || 'other',
      message: t.message,
      featured: t.featured || false
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      toast.success('Testimonial deleted');
      fetchTestimonials();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      handle: '',
      platform: 'other',
      message: '',
      featured: false
    });
    setAvatarFile(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <div className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)]">
        <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-3 text-black">
          <span className="w-2 h-8 bg-brand-purple rounded-full"></span>
          {editingId ? 'Refine Testimonial' : 'New Voice'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Client Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-brand-purple/5 focus:border-brand-purple transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Social Handle</label>
                <input
                  type="text"
                  name="handle"
                  value={formData.handle}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-brand-purple/5 focus:border-brand-purple transition-all"
                  placeholder="@johndoe"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Platform</label>
                <input
                  type="text"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-brand-purple/5 focus:border-brand-purple transition-all"
                  placeholder="X (Twitter)"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Avatar Image</label>
                <div className="relative group">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl px-5 py-4 text-center group-hover:border-brand-purple transition-all">
                    <span className="text-xs text-gray-400 group-hover:text-black truncate block">
                      {avatarFile ? avatarFile.name : 'Choose Avatar'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-brand-purple/5 focus:border-brand-purple transition-all resize-none"
                placeholder="What did they say about Pixen?"
              ></textarea>
            </div>
            
            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                className="flex-1 bg-brand-purple text-white font-bold py-4 rounded-2xl hover:bg-brand-purple/90 transform active:scale-[0.98] transition-all shadow-[0_20px_40px_-10px_rgba(106,29,181,0.3)]"
              >
                {editingId ? 'Confirm Updates' : 'Share to World'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 bg-gray-50 text-gray-500 font-bold py-4 rounded-2xl hover:bg-gray-100 transition-all border border-gray-100"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map(t => (
          <div key={t._id} className="bg-white rounded-[40px] border border-gray-100 p-8 group hover:border-brand-purple/20 transition-all shadow-sm hover:shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
              <button onClick={() => handleEdit(t)} className="p-2.5 bg-gray-50 text-gray-500 rounded-full hover:bg-brand-purple hover:text-white transition-all shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
              <button onClick={() => handleDelete(t._id)} className="p-2.5 bg-gray-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-purple/10">
                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-display font-bold text-black text-lg">{t.name}</h4>
                <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase">{t.handle}</p>
              </div>
            </div>
            
            <p className="text-gray-500 text-sm leading-relaxed italic font-medium">&ldquo;{t.message}&rdquo;</p>
            
            <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-tighter text-brand-purple">{t.platform}</span>
              {t.featured && <span className="w-2 h-2 bg-brand-purple rounded-full animate-pulse shadow-[0_0_12px_rgba(106,29,181,0.4)]"></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialManager;
