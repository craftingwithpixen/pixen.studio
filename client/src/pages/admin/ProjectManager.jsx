import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2, FiStar, FiPlus, FiX, FiCheck, FiLayers, FiImage, FiSettings, FiFileText } from 'react-icons/fi';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editingCsId, setEditingCsId] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');

  const initialFormState = {
    title: '',
    category: 'Client Project',
    type: 'in project',
    shortDescription: '',
    detailedDescription: '',
    status: 'idea',

    liveUrl: '',
    tags: '',
    techStack: '',
    features: '',
    isFeatured: false,
    order: 0,
    // Case Study
    cs_overview: '',
    cs_problemStatement: '',
    cs_objectives: [],
    cs_targetUsers: [],
    cs_challenges: [],
    cs_solutions: [],
    cs_arch_description: '',
    cs_techDetails: [],
    cs_workflow: [],
    cs_results_metrics: [],
    cs_results_summary: '',
    cs_learnings: [],
    cs_futureScope: []
  };

  const [formData, setFormData] = useState(initialFormState);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [diagramFile, setDiagramFile] = useState(null);

  const handleBulkUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const jsonFile = files.find(f => f.name.endsWith('.json') || f.type === 'application/json');
    const imageFiles = files.filter(f => f.type.startsWith('image/'));

    if (jsonFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          
          const newFormData = {
            ...initialFormState,
            title: json.title || '',
            category: json.category || 'Client Project',
            type: json.type || 'in project',
            shortDescription: json.shortDescription || '',
            detailedDescription: json.detailedDescription || '',
            status: json.status || 'idea',

            liveUrl: json.liveUrl || '',
            tags: Array.isArray(json.tags) ? json.tags.join(', ') : (json.tags || ''),
            techStack: Array.isArray(json.techStack) ? json.techStack.join(', ') : (json.techStack || ''),
            features: Array.isArray(json.features) ? json.features.join(', ') : (json.features || ''),
            isFeatured: !!json.isFeatured,
            order: json.order || 0,
            cs_overview: json.caseStudy?.overview || '',
            cs_problemStatement: json.caseStudy?.problemStatement || '',
            cs_objectives: json.caseStudy?.objectives || [],
            cs_targetUsers: json.caseStudy?.targetUsers || [],
            cs_challenges: json.caseStudy?.challenges || [],
            cs_solutions: json.caseStudy?.solutions || [],
            cs_arch_description: json.caseStudy?.arch_description || '',
            cs_techDetails: json.caseStudy?.techDetails || [],
            cs_workflow: json.caseStudy?.workflow || [],
            cs_results_metrics: json.caseStudy?.results_metrics || [],
            cs_results_summary: json.caseStudy?.results_summary || '',
            cs_learnings: json.caseStudy?.learnings || [],
            cs_futureScope: json.caseStudy?.futureScope || []
          };

          setFormData(newFormData);

          if (imageFiles.length > 0) {
            const thumb = imageFiles.find(f => f.name.toLowerCase().includes('thumb') || f.name.toLowerCase().includes('cover')) || imageFiles[0];
            setThumbnailFile(thumb);
            const gallery = imageFiles.filter(f => f !== thumb);
            setGalleryFiles(gallery);
            toast.success(`Project loaded with ${imageFiles.length} images!`);
            setActiveTab('basic');
          } else {
            toast.success('Information loaded! Now select your images.');
            setActiveTab('media');
          }
        } catch (err) {
          toast.error('Invalid JSON format');
        }
      };
      reader.readAsText(jsonFile);
    } else {
      toast.error('Please include a .json file for bulk upload');
    }
    e.target.value = '';
  };

  const downloadTemplate = () => {
    const template = {
      title: "Sample Project Name",
      category: "Client Project",
      type: "in project",
      status: "completed",
      shortDescription: "A brief pitch for the project.",
      detailedDescription: "A deep dive into the project's background and execution.",

      liveUrl: "https://...",
      tags: ["React", "UI/UX", "Vite"],
      techStack: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
      features: ["Real-time Sync", "Multi-user Auth", "Cloud Storage"],
      isFeatured: true,
      order: 1,
      caseStudy: {
        overview: "Detailed overview of the case study.",
        problemStatement: "The problem this project aimed to solve.",
        objectives: ["Objective 1", "Objective 2"],
        targetUsers: ["Developers", "Students"],
        challenges: ["Technical Hurdle 1", "Performance Optimization"],
        solutions: [
          { title: "Architecture", description: "Implemented a microservices architecture." }
        ],
        arch_description: "System design details...",
        techDetails: [
          { title: "Frontend", description: "Built with React and Framer Motion." }
        ],
        workflow: [
          { step: "Discovery", description: "Initial research and wireframing." }
        ],
        results_metrics: [
          { label: "Performance", value: "99%" }
        ],
        results_summary: "Overall success summary.",
        learnings: ["Learning 1", "Learning 2"],
        futureScope: ["Feature A", "Expansion B"]
      }
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project_template.json';
    a.click();
    URL.revokeObjectURL(url);
  };

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

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field, defaultValue = '') => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], defaultValue] }));
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleObjectArrayChange = (field, index, subfield, value) => {
    const newArray = [...formData[field]];
    newArray[index] = { ...newArray[index], [subfield]: value };
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    // Project fields
    const projectFields = ['title', 'category', 'type', 'shortDescription', 'detailedDescription', 'status', 'liveUrl', 'tags', 'techStack', 'features', 'isFeatured', 'order'];
    projectFields.forEach(key => data.append(key, formData[key]));
    
    if (thumbnailFile) data.append('thumbnail', thumbnailFile);
    galleryFiles.forEach(file => data.append('images', file));

    // Case Study data
    const csData = {
        overview: formData.cs_overview,
        problemStatement: formData.cs_problemStatement,
        objectives: formData.cs_objectives,
        targetUsers: formData.cs_targetUsers,
        challenges: formData.cs_challenges,
        solutions: formData.cs_solutions,
        architecture: {
            description: formData.cs_arch_description
        },
        techDetails: formData.cs_techDetails,
        workflow: formData.cs_workflow,
        results: {
            metrics: formData.cs_results_metrics,
            summary: formData.cs_results_summary
        },
        learnings: formData.cs_learnings,
        futureScope: formData.cs_futureScope
    };

    data.append('caseStudyData', JSON.stringify(csData));
    if (editingCsId) data.append('caseStudyId', editingCsId);
    if (diagramFile) data.append('diagram', diagramFile);

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
    const cs = project.caseStudy || {};
    setEditingCsId(cs._id || null);
    
    setFormData({
      title: project.title,
      category: project.category || 'Client Project',
      type: project.type || 'in project',
      shortDescription: project.shortDescription || '',
      detailedDescription: project.detailedDescription || '',
      status: project.status || 'idea',

      liveUrl: project.liveUrl || '',
      tags: project.tags?.join(', ') || '',
      techStack: project.techStack?.join(', ') || '',
      features: project.features?.join(', ') || '',
      isFeatured: project.isFeatured || false,
      order: project.order || 0,
      // Case Study
      cs_overview: cs.overview || '',
      cs_problemStatement: cs.problemStatement || '',
      cs_objectives: cs.objectives || [],
      cs_targetUsers: cs.targetUsers || [],
      cs_challenges: cs.challenges || [],
      cs_solutions: cs.solutions || [],
      cs_arch_description: cs.architecture?.description || '',
      cs_techDetails: cs.techDetails || [],
      cs_workflow: cs.workflow || [],
      cs_results_metrics: cs.results?.metrics || [],
      cs_results_summary: cs.results?.summary || '',
      cs_learnings: cs.learnings || [],
      cs_futureScope: cs.futureScope || []
    });
    setActiveTab('basic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setEditingCsId(null);
    setFormData(initialFormState);
    setThumbnailFile(null);
    setGalleryFiles([]);
    setDiagramFile(null);
    setActiveTab('basic');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project and its case study?')) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted');
      fetchProjects();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  if (loading) return <div className="text-center py-20 text-black/40 font-medium">Initializing Workspace...</div>;

  return (
    <div className="space-y-16 max-w-[1200px] mx-auto pb-20">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-black/[0.08] p-6 sm:p-10 rounded-[32px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <h2 className="text-[28px] font-sans font-medium flex items-center gap-4 text-black">
                <span className="w-1.5 h-10 bg-[#6A1DB5] rounded-full"></span>
                {editingId ? 'Refine Project' : 'New Creation'}
            </h2>
            <div className="flex items-center gap-3">
                <button 
                  type="button" 
                  onClick={downloadTemplate}
                  className="px-4 py-2 bg-black/5 text-black/40 rounded-xl text-[10px] font-bold uppercase hover:bg-black/10 transition-all flex items-center gap-2"
                >
                  Template
                </button>
                <div className="relative">
                  <input 
                    type="file" 
                    multiple
                    onChange={handleBulkUpload} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    title="Upload JSON + Images"
                  />
                  <button 
                    type="button"
                    className="px-4 py-2 bg-[#6A1DB5]/10 text-[#6A1DB5] rounded-xl text-[10px] font-bold uppercase hover:bg-[#6A1DB5]/20 transition-all flex items-center gap-2"
                  >
                    Bulk Upload
                  </button>
                </div>
            </div>
            <div className="flex bg-[#F5F3FF] p-1 rounded-2xl border border-[#6A1DB5]/10">
                {[
                    {id: 'basic', label: 'Basic', icon: <FiFileText />},
                    {id: 'details', label: 'Stack', icon: <FiLayers />},
                    {id: 'media', label: 'Media', icon: <FiImage />},
                    {id: 'cs', label: 'Case Study', icon: <FiSettings />}
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${
                            activeTab === tab.id ? 'bg-white text-[#6A1DB5] shadow-sm' : 'text-black/40 hover:text-black/60'
                        }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <AnimatePresence mode="wait">
            {activeTab === 'basic' && (
              <motion.div
                key="basic"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Project Title</label>
                        <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full bg-white border border-black/[0.1] rounded-2xl px-5 py-4 focus:ring-4 focus:ring-[#6A1DB5]/5 focus:border-[#6A1DB5] outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-white border border-black/[0.1] rounded-2xl px-5 py-4 focus:border-[#6A1DB5] outline-none transition-all text-xs">
                                <option value="MVP">MVP</option>
                                <option value="Our Products">Our Products</option>
                                <option value="Client Project">Client Project</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-white border border-black/[0.1] rounded-2xl px-5 py-4 focus:border-[#6A1DB5] outline-none transition-all text-xs">
                                <option value="in project">In Project</option>
                                <option value="showcase">Showcase</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-white border border-black/[0.1] rounded-2xl px-5 py-4 focus:border-[#6A1DB5] outline-none transition-all text-xs">
                                <option value="idea">Idea</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Tags (Comma Sep)</label>
                        <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="UI/UX, Web, App" className="w-full bg-white border border-black/[0.1] rounded-2xl px-5 py-4 focus:border-[#6A1DB5] outline-none" />
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Short Pitch (Description)</label>
                        <textarea name="shortDescription" rows="2" value={formData.shortDescription} onChange={handleChange} className="w-full bg-white border border-black/[0.1] rounded-2xl px-5 py-4 focus:border-[#6A1DB5] outline-none resize-none" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Detailed Narrative</label>
                        <textarea name="detailedDescription" rows="5" value={formData.detailedDescription} onChange={handleChange} className="w-full bg-white border border-black/[0.1] rounded-2xl px-5 py-4 focus:border-[#6A1DB5] outline-none" />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Live URL</label>
                            <input type="url" name="liveUrl" value={formData.liveUrl} onChange={handleChange} className="w-full bg-white border border-black/[0.1] rounded-2xl px-5 py-4 focus:border-[#6A1DB5] outline-none" />
                        </div>
                    </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'details' && (
               <motion.div
                key="details"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
               >
                 <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Tech Stack (Comma Separated)</label>
                    <textarea name="techStack" value={formData.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB..." className="w-full bg-white border border-black/[0.1] rounded-2xl px-5 py-4 focus:border-[#6A1DB5] outline-none h-24" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Core Features (Comma Separated)</label>
                    <textarea name="features" value={formData.features} onChange={handleChange} placeholder="User Auth, Payment Gateway, Real-time Updates..." className="w-full bg-white border border-black/[0.1] rounded-2xl px-5 py-4 focus:border-[#6A1DB5] outline-none h-24" />
                 </div>
                 <div className="flex items-center gap-8 p-6 bg-[#F8F7FF] rounded-2xl border border-[#6A1DB5]/5">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${formData.isFeatured ? 'bg-[#6A1DB5] border-[#6A1DB5]' : 'border-black/20 group-hover:border-[#6A1DB5]'}`}>
                            {formData.isFeatured && <FiCheck className="text-white" />}
                        </div>
                        <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="hidden" />
                        <span className="text-xs font-bold uppercase tracking-widest text-black/60">Featured Project</span>
                    </label>
                    <div className="flex items-center gap-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-black/40">Display Order</label>
                        <input type="number" name="order" value={formData.order} onChange={handleChange} className="w-20 bg-white border border-black/[0.1] rounded-xl px-4 py-2 focus:border-[#6A1DB5] outline-none" />
                    </div>
                 </div>
               </motion.div>
            )}

            {activeTab === 'media' && (
                <motion.div
                    key="media"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-10"
                >
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Thumbnail Cover</label>
                            <div className="relative border-2 border-dashed border-black/10 rounded-3xl p-8 text-center hover:border-[#6A1DB5] transition-all cursor-pointer group">
                                <input type="file" onChange={(e) => setThumbnailFile(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                                <div className="space-y-2">
                                    <FiImage className="mx-auto text-black/20 group-hover:text-[#6A1DB5] transition-colors" size={32} />
                                    <p className="text-[13px] text-black/40 font-medium">{thumbnailFile ? thumbnailFile.name : 'Drop main image here'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Project Gallery (Multiple)</label>
                            <div className="relative border-2 border-dashed border-black/10 rounded-3xl p-8 text-center hover:border-[#6A1DB5] transition-all cursor-pointer group">
                                <input type="file" multiple onChange={(e) => setGalleryFiles(Array.from(e.target.files))} className="absolute inset-0 opacity-0 cursor-pointer" />
                                <div className="space-y-2">
                                    <FiPlus className="mx-auto text-black/20 group-hover:text-[#6A1DB5] transition-colors" size={32} />
                                    <p className="text-[13px] text-black/40 font-medium">
                                        {galleryFiles.length > 0 ? `${galleryFiles.length} files selected` : 'Add showcase images'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {activeTab === 'cs' && (
                <motion.div
                    key="cs"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-12"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Case Study Overview</label>
                            <textarea name="cs_overview" rows="3" value={formData.cs_overview} onChange={handleChange} className="w-full bg-white border border-black/[0.1] rounded-2xl px-5 py-4 focus:border-[#6A1DB5] outline-none" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Problem Statement</label>
                            <textarea name="cs_problemStatement" rows="3" value={formData.cs_problemStatement} onChange={handleChange} className="w-full bg-white border border-black/[0.1] rounded-2xl px-5 py-4 focus:border-[#6A1DB5] outline-none" />
                        </div>
                    </div>

                    {/* Multi-input sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Objectives */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Objectives</label>
                                <button type="button" onClick={() => addArrayItem('cs_objectives')} className="p-1.5 bg-[#6A1DB5]/5 text-[#6A1DB5] rounded-lg hover:bg-[#6A1DB5]/10"><FiPlus size={14} /></button>
                            </div>
                            {formData.cs_objectives.map((item, i) => (
                                <div key={i} className="flex gap-2">
                                    <input value={item} onChange={(e) => handleArrayChange('cs_objectives', i, e.target.value)} className="flex-1 bg-[#F8F7FF] border border-black/5 rounded-xl px-4 py-2.5 text-[14px]" />
                                    <button type="button" onClick={() => removeArrayItem('cs_objectives', i)} className="text-black/20 hover:text-red-500"><FiX /></button>
                                </div>
                            ))}
                        </div>

                        {/* Challenges */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Technical Challenges</label>
                                <button type="button" onClick={() => addArrayItem('cs_challenges')} className="p-1.5 bg-[#6A1DB5]/5 text-[#6A1DB5] rounded-lg hover:bg-[#6A1DB5]/10"><FiPlus size={14} /></button>
                            </div>
                            {formData.cs_challenges.map((item, i) => (
                                <div key={i} className="flex gap-2">
                                    <input value={item} onChange={(e) => handleArrayChange('cs_challenges', i, e.target.value)} className="flex-1 bg-[#F8F7FF] border border-black/5 rounded-xl px-4 py-2.5 text-[14px]" />
                                    <button type="button" onClick={() => removeArrayItem('cs_challenges', i)} className="text-black/20 hover:text-red-500"><FiX /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Solutions (Objects) */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Proposed Solutions</label>
                            <button type="button" onClick={() => addArrayItem('cs_solutions', {title: '', description: ''})} className="px-4 py-2 bg-[#6A1DB5] text-white rounded-xl text-[10px] font-bold uppercase flex items-center gap-2"><FiPlus /> Add Solution</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formData.cs_solutions.map((item, i) => (
                                <div key={i} className="p-6 bg-[#F8F7FF] rounded-2xl border border-black/5 space-y-3 relative">
                                    <button type="button" onClick={() => removeArrayItem('cs_solutions', i)} className="absolute top-4 right-4 text-black/20 hover:text-red-500"><FiX /></button>
                                    <input placeholder="Title" value={item.title} onChange={(e) => handleObjectArrayChange('cs_solutions', i, 'title', e.target.value)} className="w-full bg-white border border-black/5 rounded-lg px-3 py-2 font-bold text-sm" />
                                    <textarea placeholder="Description" value={item.description} onChange={(e) => handleObjectArrayChange('cs_solutions', i, 'description', e.target.value)} className="w-full bg-white border border-black/5 rounded-lg px-3 py-2 text-sm h-20 resize-none" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Architecture */}
                    <div className="space-y-6 pt-6 border-t border-black/5">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-black/60">Architecture & Diagram</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <textarea placeholder="Explain the system architecture..." name="cs_arch_description" value={formData.cs_arch_description} onChange={handleChange} className="w-full bg-white border border-black/[0.1] rounded-2xl px-5 py-4 focus:border-[#6A1DB5] outline-none h-32" />
                             <div className="relative border-2 border-dashed border-black/10 rounded-2xl p-6 text-center hover:border-[#6A1DB5] transition-all cursor-pointer group flex flex-col justify-center">
                                <input type="file" onChange={(e) => setDiagramFile(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                                <FiImage className="mx-auto text-black/20 group-hover:text-[#6A1DB5] mb-2" size={24} />
                                <p className="text-[12px] text-black/40">{diagramFile ? diagramFile.name : 'Upload Architecture Diagram'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Workflow */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Development Workflow</label>
                            <button type="button" onClick={() => addArrayItem('cs_workflow', {step: '', description: ''})} className="p-1.5 bg-[#6A1DB5]/5 text-[#6A1DB5] rounded-lg hover:bg-[#6A1DB5]/10"><FiPlus size={14} /></button>
                        </div>
                        <div className="space-y-3">
                            {formData.cs_workflow.map((item, i) => (
                                <div key={i} className="flex gap-4 items-center bg-[#F8F7FF] p-4 rounded-2xl border border-black/5">
                                    <span className="w-8 h-8 rounded-full bg-[#6A1DB5] text-white flex items-center justify-center font-bold text-xs shrink-0">{i+1}</span>
                                    <input placeholder="Step Name" value={item.step} onChange={(e) => handleObjectArrayChange('cs_workflow', i, 'step', e.target.value)} className="w-1/3 bg-white border border-black/5 rounded-lg px-3 py-2 text-sm" />
                                    <input placeholder="Short description..." value={item.description} onChange={(e) => handleObjectArrayChange('cs_workflow', i, 'description', e.target.value)} className="flex-1 bg-white border border-black/5 rounded-lg px-3 py-2 text-sm" />
                                    <button type="button" onClick={() => removeArrayItem('cs_workflow', i)} className="text-black/20 hover:text-red-500"><FiX /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Results & Metrics */}
                    <div className="space-y-6 pt-6 border-t border-black/5">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Results & Metrics</label>
                            <button type="button" onClick={() => addArrayItem('cs_results_metrics', {label: '', value: ''})} className="p-1.5 bg-[#6A1DB5]/5 text-[#6A1DB5] rounded-lg hover:bg-[#6A1DB5]/10"><FiPlus size={14} /></button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {formData.cs_results_metrics.map((item, i) => (
                                <div key={i} className="p-4 bg-white border border-black/5 rounded-xl space-y-2 relative shadow-sm">
                                    <button type="button" onClick={() => removeArrayItem('cs_results_metrics', i)} className="absolute top-2 right-2 text-black/20 hover:text-red-500"><FiX size={12} /></button>
                                    <input placeholder="200ms" value={item.value} onChange={(e) => handleObjectArrayChange('cs_results_metrics', i, 'value', e.target.value)} className="w-full text-xl font-bold text-[#6A1DB5] outline-none" />
                                    <input placeholder="Load Time" value={item.label} onChange={(e) => handleObjectArrayChange('cs_results_metrics', i, 'label', e.target.value)} className="w-full text-[10px] uppercase tracking-widest text-black/40 outline-none" />
                                </div>
                            ))}
                        </div>
                        <textarea placeholder="Results summary..." name="cs_results_summary" value={formData.cs_results_summary} onChange={handleChange} className="w-full bg-white border border-black/[0.1] rounded-2xl px-5 py-4 focus:border-[#6A1DB5] outline-none h-24" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6 border-t border-black/5">
                        {/* Key Learnings */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Key Learnings</label>
                                <button type="button" onClick={() => addArrayItem('cs_learnings')} className="p-1.5 bg-[#6A1DB5]/5 text-[#6A1DB5] rounded-lg hover:bg-[#6A1DB5]/10"><FiPlus size={14} /></button>
                            </div>
                            {formData.cs_learnings.map((item, i) => (
                                <div key={i} className="flex gap-2">
                                    <input value={item} onChange={(e) => handleArrayChange('cs_learnings', i, e.target.value)} className="flex-1 bg-[#F8F7FF] border border-black/5 rounded-xl px-4 py-2.5 text-[14px]" />
                                    <button type="button" onClick={() => removeArrayItem('cs_learnings', i)} className="text-black/20 hover:text-red-500"><FiX /></button>
                                </div>
                            ))}
                        </div>

                        {/* Future Scope */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Future Scope</label>
                                <button type="button" onClick={() => addArrayItem('cs_futureScope')} className="p-1.5 bg-[#6A1DB5]/5 text-[#6A1DB5] rounded-lg hover:bg-[#6A1DB5]/10"><FiPlus size={14} /></button>
                            </div>
                            {formData.cs_futureScope.map((item, i) => (
                                <div key={i} className="flex gap-2">
                                    <input value={item} onChange={(e) => handleArrayChange('cs_futureScope', i, e.target.value)} className="flex-1 bg-[#F8F7FF] border border-black/5 rounded-xl px-4 py-2.5 text-[14px]" />
                                    <button type="button" onClick={() => removeArrayItem('cs_futureScope', i)} className="text-black/20 hover:text-red-500"><FiX /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>

          {/* Form Actions */}
          <div className="flex gap-4 pt-8 border-t border-black/5">
            <button type="submit" className="flex-1 py-4 bg-[#6A1DB5] text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#5a189a] transition-all shadow-lg shadow-[#6A1DB5]/20">
                {editingId ? 'Update Masterpiece' : 'Launch Project'}
            </button>
            {editingId && (
                <button type="button" onClick={resetForm} className="px-10 py-4 bg-white border border-black/10 text-black/40 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-black/5 transition-all">
                    Cancel
                </button>
            )}
          </div>
        </form>
      </motion.div>

      {/* Projects Display */}
      <div className="space-y-10">
        <div className="flex items-center justify-between">
            <h3 className="text-2xl font-sans font-medium text-black">Current Archive</h3>
            <span className="text-xs font-bold text-black/30 uppercase tracking-widest">{projects.length} Entries</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
                <motion.div
                    key={project._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-[32px] border border-black/[0.06] overflow-hidden hover:border-[#6A1DB5]/20 hover:shadow-2xl transition-all"
                >
                    <div className="aspect-[4/3] relative bg-black/5 overflow-hidden">
                        <img src={project.thumbnail || project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                            <button onClick={() => handleEdit(project)} className="p-4 bg-white text-[#6A1DB5] rounded-2xl hover:bg-[#6A1DB5] hover:text-white transition-all shadow-xl"><FiEdit2 size={20} /></button>
                            <button onClick={() => handleDelete(project._id)} className="p-4 bg-white text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-xl"><FiTrash2 size={20} /></button>
                        </div>
                        <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-black shadow-sm">
                            {project.category}
                        </div>
                        {project.isFeatured && (
                            <div className="absolute top-6 right-6 w-10 h-10 bg-[#6A1DB5] text-white rounded-full flex items-center justify-center shadow-lg"><FiStar fill="white" /></div>
                        )}
                    </div>
                    <div className="p-8">
                        <div className="flex items-center gap-2 mb-3">
                            <div className={`w-2 h-2 rounded-full ${project.status === 'completed' ? 'bg-green-500' : project.status === 'in-progress' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">{project.status}</span>
                        </div>
                        <h4 className="text-xl font-bold text-black mb-3 group-hover:text-[#6A1DB5] transition-colors">{project.title}</h4>
                        <p className="text-sm text-black/50 line-clamp-2 leading-relaxed">{project.shortDescription}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;
