import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FiLogOut, FiFolder, FiMessageSquare, FiMail,
  FiPlus, FiEdit2, FiTrash2, FiX, FiCheck,
  FiChevronDown, FiExternalLink,
} from 'react-icons/fi';
import { SingleImageUpload, MultiImageUpload } from '../../components/admin/ImageUpload';

/* ── shared UI helpers ─────────────────────────────── */
const CATEGORY_LABELS = {
  products: 'Products',
  poc_projects: 'POC Projects',
  client_projects: 'Client Work',
};

const STATUS_COLORS = {
  new: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  read: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  replied: 'text-green-400 bg-green-400/10 border-green-400/20',
};

function Badge({ label, color }) {
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${color}`}>
      {label}
    </span>
  );
}

function Card({ children, className = '' }) {
  return (
    <div className={`bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      {label && <label className="block text-[11px] text-brand-muted uppercase tracking-widest font-semibold mb-1.5">{label}</label>}
      <input
        {...props}
        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-brand-purple/60 transition-all"
      />
    </div>
  );
}

function TextArea({ label, ...props }) {
  return (
    <div>
      {label && <label className="block text-[11px] text-brand-muted uppercase tracking-widest font-semibold mb-1.5">{label}</label>}
      <textarea
        {...props}
        rows={props.rows || 3}
        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-brand-purple/60 transition-all resize-none"
      />
    </div>
  );
}

function Select({ label, children, ...props }) {
  return (
    <div className="relative">
      {label && <label className="block text-[11px] text-brand-muted uppercase tracking-widest font-semibold mb-1.5">{label}</label>}
      <select
        {...props}
        className="w-full appearance-none bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple/60 transition-all pr-9"
      >
        {children}
      </select>
      <FiChevronDown className="absolute right-3 top-[calc(100%-1.6rem)] text-brand-muted pointer-events-none" size={14} />
    </div>
  );
}

function ConfirmDelete({ onConfirm, onCancel }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-red-400">Delete?</span>
      <button onClick={onConfirm} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
        <FiCheck size={12} />
      </button>
      <button onClick={onCancel} className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:bg-white/10 transition-colors">
        <FiX size={12} />
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS TAB
══════════════════════════════════════════════════════ */
const EMPTY_PROJECT = {
  title: '', category: 'products', description: '', tech_stack: '',
  link: '', client_name: '', order: 0, featured: false,
  thumbnail: null,   // { url, public_id }
  images: [],        // [{ url, public_id }, …]
};

function ProjectsTab({ authHeaders }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('products');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_PROJECT);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/projects');
      setProjects(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY_PROJECT, category: activeCategory });
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditing(p._id);
    setForm({
      title: p.title,
      category: p.category,
      description: p.description || '',
      tech_stack: (p.tech_stack || []).join(', '),
      link: p.link || '',
      client_name: p.client_name || '',
      order: p.order || 0,
      featured: p.featured || false,
      thumbnail: p.image ? { url: p.image, public_id: p.image_public_id || '' } : null,
      images: p.images || [],
    });
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        category: form.category,
        description: form.description,
        tech_stack: form.tech_stack.split(',').map((s) => s.trim()).filter(Boolean),
        link: form.link,
        client_name: form.client_name,
        order: Number(form.order),
        featured: form.featured,
        image: form.thumbnail?.url || '',
        image_public_id: form.thumbnail?.public_id || '',
        images: form.images,
      };
      if (editing) {
        await axios.put(`/api/projects/${editing}`, payload, authHeaders());
      } else {
        await axios.post('/api/projects', payload, authHeaders());
      }
      await fetchProjects();
      closeForm();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/projects/${id}`, authHeaders());
    setDeletingId(null);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  const filtered = projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Category tabs */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
          const count = projects.filter((p) => p.category === key).length;
          const active = activeCategory === key;
          return (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background: active ? '#6B35D918' : 'transparent',
                border: `1px solid ${active ? '#6B35D955' : 'rgba(255,255,255,0.07)'}`,
                color: active ? '#9B6BFF' : '#666',
              }}
            >
              {label}
              <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: active ? '#6B35D925' : 'rgba(255,255,255,0.06)', color: active ? '#9B6BFF' : '#444' }}>
                {count}
              </span>
            </button>
          );
        })}
        <button
          onClick={openCreate}
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple hover:bg-brand-violet text-white text-xs font-semibold transition-all hover:shadow-[0_0_20px_#6B35D940]"
        >
          <FiPlus size={13} /> Add Project
        </button>
      </div>

      {/* Inline form */}
      {showForm && (
        <Card className="mb-6 border-brand-purple/30">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-display font-bold text-white uppercase tracking-wide">
              {editing ? 'Edit Project' : 'New Project'}
            </h3>
            <button onClick={closeForm} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40">
              <FiX size={16} />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              <Select label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </Select>
            </div>

            {/* Description */}
            <TextArea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Full project description…" rows={4} />

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Tech Stack (comma-separated)" value={form.tech_stack} onChange={(e) => setForm({ ...form, tech_stack: e.target.value })} placeholder="React, Node.js, MongoDB" />
              <Input label="Live URL" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://…" />
              {form.category === 'client_projects' && (
                <Input label="Client Name" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} placeholder="Client company" />
              )}
              <Input label="Display Order" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SingleImageUpload
                label="Thumbnail Image"
                value={form.thumbnail}
                onChange={(v) => setForm({ ...form, thumbnail: v })}
              />
              <MultiImageUpload
                label="Demo Screenshots"
                value={form.images}
                onChange={(v) => setForm({ ...form, images: v })}
                max={8}
              />
            </div>

            {/* Featured */}
            <div className="flex items-center gap-2">
              <input
                id="featured"
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="accent-brand-purple w-4 h-4"
              />
              <label htmlFor="featured" className="text-xs text-brand-muted cursor-pointer">Featured project</label>
            </div>

            <div className="flex gap-3 justify-end pt-1">
              <button type="button" onClick={closeForm} className="px-4 py-2 rounded-xl text-xs text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl bg-brand-purple hover:bg-brand-violet text-white text-xs font-semibold transition-all disabled:opacity-50">
                {saving ? 'Saving…' : editing ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Project list */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-5 h-5 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-brand-muted text-sm">No projects in this category yet.</p>
          <button onClick={openCreate} className="mt-3 text-brand-purple text-xs hover:underline">Add one →</button>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <Card key={p._id} className="flex items-start gap-4">
              {/* Thumbnail */}
              {p.image ? (
                <img src={p.image} alt={p.title} className="w-20 h-14 rounded-xl object-cover shrink-0 bg-white/5" />
              ) : (
                <div className="w-20 h-14 rounded-xl bg-brand-purple/10 flex items-center justify-center shrink-0">
                  <span className="text-brand-purple/40 font-display font-black text-lg">
                    {p.title.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-display font-bold text-white text-sm">{p.title}</span>
                  {p.featured && <Badge label="Featured" color="text-brand-purple bg-brand-purple/10 border-brand-purple/20" />}
                  {p.images?.length > 0 && (
                    <span className="text-[10px] text-white/30">{p.images.length} screenshot{p.images.length !== 1 ? 's' : ''}</span>
                  )}
                  {p.link && p.link !== '#' && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-brand-purple transition-colors">
                      <FiExternalLink size={12} />
                    </a>
                  )}
                </div>
                {p.description && <p className="text-brand-muted text-xs leading-relaxed line-clamp-2 mb-2">{p.description}</p>}
                {p.tech_stack?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {p.tech_stack.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30">{t}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {deletingId === p._id ? (
                  <ConfirmDelete onConfirm={() => handleDelete(p._id)} onCancel={() => setDeletingId(null)} />
                ) : (
                  <>
                    <button onClick={() => openEdit(p)} className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                      <FiEdit2 size={13} />
                    </button>
                    <button onClick={() => setDeletingId(p._id)} className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                      <FiTrash2 size={13} />
                    </button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TESTIMONIALS TAB
══════════════════════════════════════════════════════ */
const EMPTY_TESTIMONIAL = {
  name: '', handle: '', platform: 'other', message: '',
  avatarImg: null,   // { url, public_id }
  featured: false,
};

const PLATFORMS = ['twitter', 'linkedin', 'github', 'other'];

function TestimonialsTab({ authHeaders }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_TESTIMONIAL);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/testimonials');
      setList(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openCreate = () => { setEditing(null); setForm(EMPTY_TESTIMONIAL); setShowForm(true); };

  const openEdit = (t) => {
    setEditing(t._id);
    setForm({
      name: t.name,
      handle: t.handle || '',
      platform: t.platform,
      message: t.message,
      avatarImg: t.avatar ? { url: t.avatar, public_id: t.avatar_public_id || '' } : null,
      featured: t.featured,
    });
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        handle: form.handle,
        platform: form.platform,
        message: form.message,
        avatar: form.avatarImg?.url || '',
        avatar_public_id: form.avatarImg?.public_id || '',
        featured: form.featured,
      };
      if (editing) {
        await axios.put(`/api/testimonials/${editing}`, payload, authHeaders());
      } else {
        await axios.post('/api/testimonials', payload, authHeaders());
      }
      await fetchAll();
      closeForm();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/testimonials/${id}`, authHeaders());
    setDeletingId(null);
    setList((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-brand-muted text-sm">{list.length} testimonial{list.length !== 1 ? 's' : ''}</p>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple hover:bg-brand-violet text-white text-xs font-semibold transition-all hover:shadow-[0_0_20px_#6B35D940]"
        >
          <FiPlus size={13} /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <Card className="mb-6 border-brand-purple/30">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-display font-bold text-white uppercase tracking-wide">
              {editing ? 'Edit Testimonial' : 'New Testimonial'}
            </h3>
            <button onClick={closeForm} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40"><FiX size={16} /></button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="John Doe" />
              <Input label="Handle / Role" value={form.handle} onChange={(e) => setForm({ ...form, handle: e.target.value })} placeholder="CEO, Company" />
              <Select label="Platform" value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}>
                {PLATFORMS.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </Select>
            </div>

            <TextArea label="Testimonial Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required placeholder="What they said about working with Pixen…" rows={4} />

            {/* Avatar upload */}
            <SingleImageUpload
              label="Avatar / Profile Photo"
              value={form.avatarImg}
              onChange={(v) => setForm({ ...form, avatarImg: v })}
            />

            <div className="flex items-center gap-2">
              <input id="t-featured" type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-brand-purple w-4 h-4" />
              <label htmlFor="t-featured" className="text-xs text-brand-muted cursor-pointer">Featured on homepage</label>
            </div>

            <div className="flex gap-3 justify-end pt-1">
              <button type="button" onClick={closeForm} className="px-4 py-2 rounded-xl text-xs text-white/40 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
              <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl bg-brand-purple hover:bg-brand-violet text-white text-xs font-semibold transition-all disabled:opacity-50">
                {saving ? 'Saving…' : editing ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-5 h-5 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" /></div>
      ) : list.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-brand-muted text-sm">No testimonials yet.</p>
          <button onClick={openCreate} className="mt-3 text-brand-purple text-xs hover:underline">Add one →</button>
        </Card>
      ) : (
        <div className="space-y-3">
          {list.map((t) => (
            <Card key={t._id} className="flex items-start gap-4">
              {t.avatar ? (
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover shrink-0 border border-white/10" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple font-bold shrink-0">
                  {t.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-bold text-white text-sm">{t.name}</span>
                  {t.handle && <span className="text-brand-muted text-xs">{t.handle}</span>}
                  <Badge label={t.platform} color="text-white/30 bg-white/5 border-white/10" />
                  {t.featured && <Badge label="Featured" color="text-brand-purple bg-brand-purple/10 border-brand-purple/20" />}
                </div>
                <p className="text-brand-muted text-xs leading-relaxed line-clamp-3">{t.message}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {deletingId === t._id ? (
                  <ConfirmDelete onConfirm={() => handleDelete(t._id)} onCancel={() => setDeletingId(null)} />
                ) : (
                  <>
                    <button onClick={() => openEdit(t)} className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-colors"><FiEdit2 size={13} /></button>
                    <button onClick={() => setDeletingId(t._id)} className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors"><FiTrash2 size={13} /></button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   CONTACTS TAB
══════════════════════════════════════════════════════ */
function ContactsTab({ authHeaders }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/contact', authHeaders());
      setContacts(data);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  const updateStatus = async (id, status) => {
    const { data } = await axios.patch(`/api/contact/${id}/status`, { status }, authHeaders());
    setContacts((prev) => prev.map((c) => (c._id === id ? data : c)));
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/contact/${id}`, authHeaders());
    setDeletingId(null);
    setContacts((prev) => prev.filter((c) => c._id !== id));
  };

  const filtered = filter === 'all' ? contacts : contacts.filter((c) => c.status === filter);
  const counts = { all: contacts.length, new: 0, read: 0, replied: 0 };
  contacts.forEach((c) => { counts[c.status] = (counts[c.status] || 0) + 1; });

  return (
    <div>
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {['all', 'new', 'read', 'replied'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all capitalize"
            style={{
              background: filter === s ? '#6B35D918' : 'transparent',
              border: `1px solid ${filter === s ? '#6B35D955' : 'rgba(255,255,255,0.07)'}`,
              color: filter === s ? '#9B6BFF' : '#666',
            }}
          >
            {s} <span className="opacity-60">({counts[s] || 0})</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-5 h-5 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <Card className="text-center py-12"><p className="text-brand-muted text-sm">No messages yet.</p></Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <Card key={c._id} className="cursor-pointer hover:border-white/15 transition-all">
              <div className="flex items-start gap-4" onClick={() => setExpanded(expanded === c._id ? null : c._id)}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-white text-sm">{c.name}</span>
                    <span className="text-brand-muted text-xs">{c.email}</span>
                    <Badge label={c.status} color={STATUS_COLORS[c.status]} />
                  </div>
                  {c.subject && <p className="text-white/60 text-xs mb-1">{c.subject}</p>}
                  <p className="text-brand-muted text-xs line-clamp-2">{c.message}</p>
                  <p className="text-white/20 text-[10px] mt-2">{new Date(c.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {deletingId === c._id ? (
                    <ConfirmDelete onConfirm={() => handleDelete(c._id)} onCancel={() => setDeletingId(null)} />
                  ) : (
                    <button onClick={() => setDeletingId(c._id)} className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                      <FiTrash2 size={13} />
                    </button>
                  )}
                </div>
              </div>

              {expanded === c._id && (
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap mb-4">{c.message}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-brand-muted mr-1">Mark as:</span>
                    {['new', 'read', 'replied'].map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(c._id, s)}
                        disabled={c.status === s}
                        className="px-3 py-1 rounded-full text-[10px] font-semibold transition-all capitalize disabled:opacity-30"
                        style={{
                          background: c.status === s ? '#6B35D920' : 'transparent',
                          border: `1px solid ${c.status === s ? '#6B35D955' : 'rgba(255,255,255,0.1)'}`,
                          color: c.status === s ? '#9B6BFF' : '#888',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN DASHBOARD
══════════════════════════════════════════════════════ */
const TABS = [
  { key: 'projects', label: 'Projects', icon: FiFolder },
  { key: 'testimonials', label: 'Testimonials', icon: FiMessageSquare },
  { key: 'contacts', label: 'Contacts', icon: FiMail },
];

export default function AdminDashboard() {
  const { admin, logout, authHeaders } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <div className="fixed top-0 left-1/4 w-[600px] h-[300px] bg-brand-purple/8 rounded-full blur-[150px] pointer-events-none" />

      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06]" style={{ backdropFilter: 'blur(16px)', background: 'rgba(12,12,12,0.85)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-purple to-brand-violet flex items-center justify-center">
              <span className="font-display font-black text-white text-[11px]">P</span>
            </div>
            <span className="font-display font-black text-white text-xs tracking-widest uppercase hidden sm:block">Pixen Admin</span>
          </div>

          <nav className="flex items-center gap-1">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                style={{ background: activeTab === key ? '#6B35D918' : 'transparent', color: activeTab === key ? '#9B6BFF' : '#666' }}
              >
                <Icon size={13} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-brand-muted text-xs hidden sm:block">{admin?.username}</span>
            <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all">
              <FiLogOut size={13} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        <div className="mb-6">
          <h1 className="text-xl font-display font-black text-white uppercase tracking-tight">
            {TABS.find((t) => t.key === activeTab)?.label}
          </h1>
          <p className="text-brand-muted text-xs mt-0.5">
            {activeTab === 'projects' && 'Manage portfolio projects — thumbnail, screenshots, tech stack, and links'}
            {activeTab === 'testimonials' && 'Manage client testimonials with photos displayed on the homepage'}
            {activeTab === 'contacts' && 'View and manage contact form submissions'}
          </p>
        </div>

        {activeTab === 'projects' && <ProjectsTab authHeaders={authHeaders} />}
        {activeTab === 'testimonials' && <TestimonialsTab authHeaders={authHeaders} />}
        {activeTab === 'contacts' && <ContactsTab authHeaders={authHeaders} />}
      </main>
    </div>
  );
}
