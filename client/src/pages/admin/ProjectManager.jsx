import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';
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
  const [innerImageFile, setInnerImageFile] = useState(null);

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
    const { name, files } = e.target;
    if (name === 'image') setImageFile(files[0]);
    if (name === 'innerImage') setInnerImageFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);
    if (innerImageFile) data.append('innerImage', innerImageFile);

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
    setInnerImageFile(null);
  };

  if (loading) return <div className="text-center py-12 text-black/40">Loading projects...</div>;

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
          {editingId ? 'Edit Project' : 'New Project'}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Project Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-white border border-black/[0.08] rounded-[20px] px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-[#6A1DB5]/10 focus:border-[#6A1DB5] transition-all text-[15px]"
                placeholder="e.g. Modern E-commerce Platform"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-white border border-black/[0.08] rounded-[20px] px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-[#6A1DB5]/10 focus:border-[#6A1DB5] transition-all appearance-none text-[15px]"
                >
                  <option value="MVP">MVP</option>
                  <option value="Our Products">Our Products</option>
                  <option value="Client Project">Client Project</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full bg-white border border-black/[0.08] rounded-[20px] px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-[#6A1DB5]/10 focus:border-[#6A1DB5] transition-all text-[15px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Tags (Comma Separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="UI/UX, React, Branding"
                className="w-full bg-white border border-black/[0.08] rounded-[20px] px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-[#6A1DB5]/10 focus:border-[#6A1DB5] transition-all text-[15px]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Live Link</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full bg-white border border-black/[0.08] rounded-[20px] px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-[#6A1DB5]/10 focus:border-[#6A1DB5] transition-all text-[15px]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Short Description</label>
              <textarea
                name="description"
                rows="2"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-white border border-black/[0.08] rounded-[20px] px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-[#6A1DB5]/10 focus:border-[#6A1DB5] transition-all resize-none text-[15px]"
                placeholder="One-liner for cards..."
              ></textarea>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">The Challenge</label>
                <textarea
                  name="challenge"
                  rows="2"
                  value={formData.challenge}
                  onChange={handleChange}
                  className="w-full bg-white border border-black/[0.08] rounded-[20px] px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-[#6A1DB5]/10 focus:border-[#6A1DB5] transition-all resize-none text-[15px]"
                  placeholder="What was the problem?"
                ></textarea>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Our Solution</label>
                <textarea
                  name="solution"
                  rows="2"
                  value={formData.solution}
                  onChange={handleChange}
                  className="w-full bg-white border border-black/[0.08] rounded-[20px] px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-[#6A1DB5]/10 focus:border-[#6A1DB5] transition-all resize-none text-[15px]"
                  placeholder="How did we fix it?"
                ></textarea>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Results</label>
                <textarea
                  name="results"
                  rows="2"
                  value={formData.results}
                  onChange={handleChange}
                  className="w-full bg-white border border-black/[0.08] rounded-[20px] px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-[#6A1DB5]/10 focus:border-[#6A1DB5] transition-all resize-none text-[15px]"
                  placeholder="Measurable outcomes..."
                ></textarea>
              </div>
            </div>

            {/* Client Feedback Section */}
            <div className="bg-black/[0.02] p-6 rounded-[24px] border border-black/[0.06] space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6A1DB5]">Client Feedback</h4>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="Name"
                  className="bg-white border border-black/[0.08] rounded-[16px] px-4 py-3 text-black text-[14px] focus:outline-none focus:border-[#6A1DB5] transition-all"
                />
                <input
                  type="text"
                  name="clientRole"
                  value={formData.clientRole}
                  onChange={handleChange}
                  placeholder="Role"
                  className="bg-white border border-black/[0.08] rounded-[16px] px-4 py-3 text-black text-[14px] focus:outline-none focus:border-[#6A1DB5] transition-all"
                />
              </div>
              <textarea
                name="clientFeedback"
                rows="1"
                value={formData.clientFeedback}
                onChange={handleChange}
                className="w-full bg-white border border-black/[0.08] rounded-[16px] px-4 py-3 text-black text-[14px] focus:outline-none focus:border-[#6A1DB5] transition-all resize-none"
                placeholder="Testimonial quote..."
              ></textarea>
            </div>

            {/* Image & Featured */}
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Cover Image</label>
                <div className="relative group">
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full bg-white border-2 border-dashed border-black/[0.1] rounded-[20px] px-5 py-4 text-center group-hover:border-[#6A1DB5] transition-all">
                    <span className="text-[14px] text-black/40 group-hover:text-black transition-colors">
                      {imageFile ? imageFile.name : 'Click to upload cover image'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Inner Image (Description)</label>
                <div className="relative group">
                  <input
                    type="file"
                    name="innerImage"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full bg-white border-2 border-dashed border-black/[0.1] rounded-[20px] px-5 py-4 text-center group-hover:border-[#6A1DB5] transition-all">
                    <span className="text-[14px] text-black/40 group-hover:text-black transition-colors">
                      {innerImageFile ? innerImageFile.name : 'Click to upload inner image'}
                    </span>
                  </div>
                </div>
              </div>

              <label className="flex items-center space-x-3 cursor-pointer group p-3 rounded-[16px] hover:bg-black/[0.02] transition-all">
                <motion.div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
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
                  Featured
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-[#6A1DB5] text-white font-bold py-4 px-6 rounded-[20px] hover:bg-[#6A1DB5]/90 transition-all shadow-[0_10px_30px_-8px_rgba(106,29,181,0.3)] text-[15px]"
              >
                {editingId ? 'Update Project' : 'Publish Project'}
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
          </div>
        </form>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-[20px] sm:text-[24px] font-sans font-medium mb-8 text-black">Your Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group bg-white rounded-[28px] sm:rounded-[32px] border border-black/[0.06] overflow-hidden hover:border-[#6A1DB5]/20 hover:shadow-[0_20px_60px_rgba(106,29,181,0.1)] transition-all"
            >
              {/* Image */}
              <div className="aspect-video relative overflow-hidden bg-black/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(project)}
                    className="p-3 bg-white text-[#6A1DB5] rounded-full hover:bg-[#6A1DB5] hover:text-white transition-all shadow-lg"
                  >
                    <FiEdit2 size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(project._id)}
                    className="p-3 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-lg"
                  >
                    <FiTrash2 size={18} />
                  </motion.button>
                </div>
                {project.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#6A1DB5] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5">
                    <FiStar size={12} fill="white" /> Featured
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start gap-3 mb-4">
                  <h3 className="font-sans font-medium text-[16px] sm:text-[18px] text-black group-hover:text-[#6A1DB5] transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <span className="text-[10px] px-2.5 py-1.5 bg-black/[0.04] rounded-full text-black/50 uppercase font-bold tracking-wider shrink-0">
                    {project.category}
                  </span>
                </div>
                <p className="text-[14px] sm:text-[15px] text-black/60 line-clamp-2 leading-relaxed font-medium">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-black/40 text-[16px]">No projects yet. Create one above to get started!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectManager;
