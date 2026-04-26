import { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Client Project',
    description: '',
    challenge: '',
    solution: '',
    results: '',
    clientName: '',
    clientRole: '',
    clientFeedback: '',
    tags: '',
    link: '',
    order: 0,
    featured: false
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      toast.error('Failed to fetch projects');
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
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, data);
        toast.success('Project updated successfully');
      } else {
        await api.post('/projects', data);
        toast.success('Project created successfully');
      }
      resetForm();
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      challenge: project.challenge || '',
      solution: project.solution || '',
      results: project.results || '',
      clientName: project.client?.name || '',
      clientRole: project.client?.role || '',
      clientFeedback: project.client?.feedback || '',
      tags: project.tags?.join(', '),
      link: project.link || '',
      order: project.order,
      featured: project.featured
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted');
      fetchProjects();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Client Project',
      description: '',
      challenge: '',
      solution: '',
      results: '',
      clientName: '',
      clientRole: '',
      clientFeedback: '',
      tags: '',
      link: '',
      order: 0,
      featured: false
    });
    setImageFile(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <div className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)]">
        <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-3 text-black">
          <span className="w-2 h-8 bg-brand-purple rounded-full"></span>
          {editingId ? 'Edit Project' : 'New Creation'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Project Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-brand-purple/5 focus:border-brand-purple transition-all"
                placeholder="e.g. Modern E-commerce"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-brand-purple/5 focus:border-brand-purple transition-all appearance-none"
                >
                  <option value="MVP">MVP</option>
                  <option value="Our Products">Our Products</option>
                  <option value="Client Project">Client Project</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Display Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-brand-purple/5 focus:border-brand-purple transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Tags (Comma Separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="UI/UX, React, Branding"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-brand-purple/5 focus:border-brand-purple transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Live Link</label>
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-brand-purple/5 focus:border-brand-purple transition-all"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Short Description</label>
              <textarea
                name="description"
                rows="2"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-brand-purple/5 focus:border-brand-purple transition-all resize-none"
                placeholder="One-liner for cards..."
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">The Challenge</label>
                <textarea
                  name="challenge"
                  rows="3"
                  value={formData.challenge}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-brand-purple/5 focus:border-brand-purple transition-all resize-none"
                  placeholder="What was the problem?"
                ></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Our Solution</label>
                <textarea
                  name="solution"
                  rows="3"
                  value={formData.solution}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-brand-purple/5 focus:border-brand-purple transition-all resize-none"
                  placeholder="How did we fix it?"
                ></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">The Results</label>
                <textarea
                  name="results"
                  rows="3"
                  value={formData.results}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-brand-purple/5 focus:border-brand-purple transition-all resize-none"
                  placeholder="Measurable outcomes..."
                ></textarea>
              </div>
            </div>

            <div className="bg-gray-50/50 p-6 rounded-[32px] border border-gray-100 space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-purple">Client Feedback</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Name</label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-purple transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Role</label>
                  <input
                    type="text"
                    name="clientRole"
                    value={formData.clientRole}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-purple transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Testimonial Quote</label>
                <textarea
                  name="clientFeedback"
                  rows="2"
                  value={formData.clientFeedback}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-purple transition-all resize-none"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">Cover Image</label>
                <div className="relative group">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl px-5 py-4 text-center group-hover:border-brand-purple transition-all">
                    <span className="text-sm text-gray-400 group-hover:text-black transition-colors">
                      {imageFile ? imageFile.name : 'Select or drop image'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-end pb-4">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${formData.featured ? 'bg-brand-purple border-brand-purple' : 'border-gray-200 group-hover:border-brand-purple'}`}>
                    {formData.featured && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <input
                    type="checkbox"
                    name="featured"
                    hidden
                    checked={formData.featured}
                    onChange={handleChange}
                  />
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">Featured</span>
                </label>
              </div>
            </div>
            
            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                className="flex-1 bg-brand-purple text-white font-bold py-4 rounded-2xl hover:bg-brand-purple/90 transform active:scale-[0.98] transition-all shadow-[0_20px_40px_-10px_rgba(106,29,181,0.3)]"
              >
                {editingId ? 'Update Project' : 'Publish Project'}
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
        {projects.map(project => (
          <div key={project._id} className="bg-white rounded-[40px] border border-gray-100 overflow-hidden group hover:border-brand-purple/20 transition-all shadow-sm hover:shadow-xl hover:shadow-brand-purple/5">
            <div className="aspect-[16/10] relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-5 py-2.5 bg-brand-purple text-white font-bold rounded-xl hover:bg-brand-purple/90 transition-all transform hover:scale-105 shadow-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="px-5 py-2.5 bg-white text-red-500 font-bold rounded-xl hover:bg-red-50 transition-all transform hover:scale-105 shadow-lg border border-red-50"
                >
                  Delete
                </button>
              </div>
              {project.featured && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-brand-purple text-white text-[10px] font-black uppercase tracking-tighter rounded-full shadow-lg">
                  Featured
                </div>
              )}
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display font-bold text-xl text-black group-hover:text-brand-purple transition-colors">{project.title}</h3>
                <span className="text-[10px] px-3 py-1 bg-gray-50 rounded-full text-gray-400 uppercase font-black tracking-widest">{project.category}</span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-medium">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;
