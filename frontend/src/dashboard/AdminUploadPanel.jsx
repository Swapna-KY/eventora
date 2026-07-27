import { useState } from 'react';
import Icon from '../components/Icon';
import { useToast } from '../context/ToastContext';
import { compressImage } from '../utils/compressImage';

export default function AdminUploadPanel() {
  const [images, setImages] = useState([]);
  const { showToast } = useToast();

  const onUpload = async (e) => {
    const files = [...(e.target.files || [])];
    if (!files.length) return;
    const results = await Promise.allSettled(
      files.map((file) => compressImage(file, { maxDimension: 1200, quality: 0.85 }).then((src) => ({ name: file.name, src })))
    );
    const successes = results.filter((r) => r.status === 'fulfilled').map((r) => r.value);
    if (successes.length) {
      setImages((prev) => [...successes, ...prev]);
      showToast(`${successes.length} image${successes.length > 1 ? 's' : ''} uploaded successfully`);
    }
    if (successes.length < files.length) {
      showToast('Some files could not be processed');
    }
    e.target.value = '';
  };

  return (
    <div className="dash-panel active">
      <div className="dash-head"><div><h2>Event Images</h2><p>Upload high-quality banners for your events.</p></div></div>
      <div className="mini-card" style={{ marginBottom: 24 }}>
        <label className="dropzone">
          <Icon name="upload" />
          <strong>Click to upload or drag & drop</strong>
          <span>PNG, JPG up to 10MB · Recommended 1600×1000</span>
          <input type="file" accept="image/*" multiple onChange={onUpload} style={{ display: 'none' }} />
        </label>
      </div>
      <div className="saved-grid">
        {images.map((img, i) => (
          <article className="ticket-card" key={i}>
            <div className="tc-media" style={{ aspectRatio: '16/10' }}><img src={img.src} alt="" /></div>
            <div className="tc-body" style={{ padding: 16 }}>
              <p style={{ fontWeight: 700, fontSize: 13.5 }}>{img.name}</p>
              <p style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 4 }}>Ready to attach to an event</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
