import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    platform: 'LinkedIn',
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
        toast.success('Testimonial updated successfully');
      } else {
        await api.post('/testimonials', data);
        toast.success('Testimonial created successfully');
      }
      resetForm();
      fetchTestimonials();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (testimonial) => {
    setEditingId(testimonial._id);
    setFormData({
      name: testimonial.name,
      handle: testimonial.handle,
      platform: testimonial.platform,
      message: testimonial.message,
      featured: testimonial.featured
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
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
      platform: 'LinkedIn',
      message: '',
      featured: false
    });
    setAvatarFile(null);
  };

  if (loading) return <div className="text-center py-12 text-black/40">Loading testimonials...</div>;

  return (
    <div className="space-y-16">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-black/[0.06] p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)]"
      >
        <h2 className="text-[22px] sm:text-[28px] font-sans font-medium mb-8 sm:mb-10 flex items-center gap-3 text-black">
          <span className="w-1.5 h-8 sm:h-10 bg-[#6A1DB5] rounded-full"></span>
          {editingId ? 'Edit Testimonial' : 'New Testimonial'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Client Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white border border-black/[0.08] rounded-[20px] px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-[#6A1DB5]/10 focus:border-[#6A1DB5] transition-all text-[15px]"
                placeholder="e.g. Sarah Johnson"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Handle/Username</label>
              <input
                type="text"
                name="handle"
                value={formData.handle}
                onChange={handleChange}
                className="w-full bg-white border border-black/[0.08] rounded-[20px] px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-[#6A1DB5]/10 focus:border-[#6A1DB5] transition-all text-[15px]"
                placeholder="@sarahjohnson"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Platform</label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full bg-white border border-black/[0.08] rounded-[20px] px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-[#6A1DB5]/10 focus:border-[#6A1DB5] transition-all appearance-none text-[15px]"
              >
                <option value="LinkedIn">LinkedIn</option>
                <option value="Twitter">Twitter</option>
                <option value="Google">Google</option>
                <option value="Clutch">Clutch</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Testimonial Message</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-white border border-black/[0.08] rounded-[20px] px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-[#6A1DB5]/10 focus:border-[#6A1DB5] transition-all resize-none text-[15px]"
              placeholder="What did they say about working with you?"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Avatar Upload */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Avatar Image</label>
              <div className="relative group">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full aspect-square bg-white border-2 border-dashed border-black/[0.1] rounded-[20px] flex items-center justify-center group-hover:border-[#6A1DB5] transition-all">
                  {avatarFile ? (
                    <span className="text-[12px] text-black/40 px-3 text-center line-clamp-2">
                      {avatarFile.name}
                    </span>
                  ) : (
                    <span className="text-[12px] text-black/40 text-center">Upload Avatar</span>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Checkbox */}
            <div className="md:col-span-2 flex items-end">
              <label className="flex items-center space-x-3 cursor-pointer group p-3 rounded-[16px] hover:bg-black/[0.02] transition-all w-full">
                <motion.div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 ${
                    formData.featured
                      ? 'bg-[#6A1DB5] border-[#6A1DB5]'
                      : 'border-black/[0.2] group-hover:border-[#6A1DB5]'
                  }`}
                >
                  {formData.featured && <FiStar size={14} className="text-white" fill="white" />}
                </motion.div>
                <input
                  type="checkbox"
                  name="featured"
                  hidden
                  checked={formData.featured}
                  onChange={handleChange}
                />
                <span className="text-[14px] font-bold uppercase tracking-widest text-black/60 group-hover:text-black transition-colors">
                  Featured Testimonial
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-black/[0.06]">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-[#6A1DB5] text-white font-bold py-4 px-6 rounded-[20px] hover:bg-[#6A1DB5]/90 transition-all shadow-[0_10px_30px_-8px_rgba(106,29,181,0.3)] text-[15px]"
            >
              {editingId ? 'Update Testimonial' : 'Publish Testimonial'}
            </motion.button>
            {editingId && (
              <motion.button
                type="button"
                onClick={resetForm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 bg-white text-black/60 font-bold py-4 rounded-[20px] hover:bg-black/[0.02] border border-black/[0.08] transition-all text-[15px]"
              >
                Cancel
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>

      {/* Testimonials Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-[20px] sm:text-[24px] font-sans font-medium mb-8 text-black">Testimonials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative bg-white rounded-[28px] sm:rounded-[32px] border border-black/[0.06] p-6 sm:p-8 hover:border-[#6A1DB5]/20 hover:shadow-[0_20px_60px_rgba(106,29,181,0.1)] transition-all"
            >
              {/* Featured Badge */}
              {testimonial.featured && (
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#6A1DB5] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5">
                  <FiStar size={12} fill="white" /> Featured
                </div>
              )}

              {/* Avatar */}
              <div className="mb-6 flex justify-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-2 border-[#6A1DB5]/10 object-cover shadow-[0_10px_30px_-8px_rgba(106,29,181,0.2)]"
                />
              </div>

              {/* Message */}
              <p className="text-[14px] sm:text-[15px] text-black/70 font-medium leading-relaxed mb-6 line-clamp-4 text-center">
                "{testimonial.message}"
              </p>

              {/* Author Info */}
              <div className="border-t border-black/[0.06] pt-5 pb-3 text-center mb-5">
                <h4 className="font-sans font-bold text-[16px] text-black mb-1">{testimonial.name}</h4>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-[12px] font-bold uppercase tracking-wide text-black/40">
                    {testimonial.handle}
                  </span>
                  <span className="text-[10px] text-black/30">•</span>
                  <span className="text-[12px] font-bold uppercase tracking-wide text-[#6A1DB5]">
                    {testimonial.platform}
                  </span>
                </div>
              </div>

              {/* Hover Actions */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity pt-2 border-t border-black/[0.06]">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(testimonial)}
                  className="flex-1 p-3 bg-white text-[#6A1DB5] rounded-full border border-[#6A1DB5]/20 hover:bg-[#6A1DB5]/5 transition-all flex items-center justify-center gap-2"
                >
                  <FiEdit2 size={16} />
                  <span className="text-[11px] font-bold uppercase tracking-wide hidden sm:inline">Edit</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(testimonial._id)}
                  className="flex-1 p-3 bg-white text-red-500 rounded-full border border-red-500/20 hover:bg-red-500/5 transition-all flex items-center justify-center gap-2"
                >
                  <FiTrash2 size={16} />
                  <span className="text-[11px] font-bold uppercase tracking-wide hidden sm:inline">Delete</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-16">
            <p className="text-black/40 text-[16px]">No testimonials yet. Create one above to get started!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TestimonialManager;
