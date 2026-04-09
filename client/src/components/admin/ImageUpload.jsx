import { useState, useRef } from 'react';
import axios from 'axios';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

/* ─── Single image uploader ─────────────────────────── */
export function SingleImageUpload({ value, onChange, label = 'Image' }) {
  const { authHeaders } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const { data } = await axios.post('/api/upload', fd, {
        ...authHeaders(),
        headers: { ...authHeaders().headers, 'Content-Type': 'multipart/form-data' },
      });
      onChange({ url: data.url, public_id: data.public_id });
    } catch {
      setError('Upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const remove = () => onChange(null);

  return (
    <div>
      <label className="block text-[11px] text-brand-muted uppercase tracking-widest font-semibold mb-1.5">
        {label}
      </label>

      {value?.url ? (
        <div className="relative rounded-xl overflow-hidden border border-white/10 group">
          <img src={value.url} alt="upload" className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs hover:bg-white/30 transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={remove}
              className="p-1.5 rounded-lg bg-red-500/30 text-red-300 hover:bg-red-500/50 transition-colors"
            >
              <FiX size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-white/10 rounded-xl h-40 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-brand-purple/40 hover:bg-brand-purple/5 transition-all"
        >
          {uploading ? (
            <div className="w-5 h-5 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FiUpload size={20} className="text-white/20" />
              <span className="text-xs text-white/30">Click or drag to upload</span>
              <span className="text-[10px] text-white/20">JPG, PNG, WebP · max 10 MB</span>
            </>
          )}
        </div>
      )}

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}

/* ─── Multi image uploader ──────────────────────────── */
export function MultiImageUpload({ value = [], onChange, label = 'Demo Images', max = 8 }) {
  const { authHeaders } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleFiles = async (files) => {
    if (!files?.length) return;
    setError('');
    const remaining = max - value.length;
    const toUpload = Array.from(files).slice(0, remaining);
    if (!toUpload.length) { setError(`Max ${max} images`); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      toUpload.forEach((f) => fd.append('images', f));
      const { data } = await axios.post('/api/upload/multiple', fd, {
        ...authHeaders(),
        headers: { ...authHeaders().headers, 'Content-Type': 'multipart/form-data' },
      });
      onChange([...value, ...data]);
    } catch {
      setError('Upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  const remove = (idx) => onChange(value.filter((_, i) => i !== idx));

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <label className="block text-[11px] text-brand-muted uppercase tracking-widest font-semibold mb-1.5">
        {label} <span className="normal-case text-white/20">({value.length}/{max})</span>
      </label>

      {value.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mb-2">
          {value.map((img, i) => (
            <div key={img.public_id || i} className="relative group rounded-lg overflow-hidden aspect-video border border-white/10">
              <img src={img.url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 p-1 rounded-md bg-black/60 text-white/70 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
              >
                <FiX size={11} />
              </button>
              <span className="absolute bottom-1 left-1 text-[9px] text-white/40 font-bold">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      )}

      {value.length < max && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-white/10 rounded-xl h-28 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-brand-purple/40 hover:bg-brand-purple/5 transition-all"
        >
          {uploading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-white/30">Uploading…</span>
            </div>
          ) : (
            <>
              <FiImage size={18} className="text-white/20" />
              <span className="text-xs text-white/30">Add demo screenshots</span>
              <span className="text-[10px] text-white/20">Select multiple files</span>
            </>
          )}
        </div>
      )}

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
