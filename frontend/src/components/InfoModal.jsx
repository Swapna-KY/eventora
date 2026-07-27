import Icon from './Icon';
import { useModal } from '../context/ModalContext';
import { INFO_PAGES } from '../data/infoContent';
import '../styles/modals.css';
import '../styles/infoModal.css';

export default function InfoModal() {
  const { infoPage, closeInfo } = useModal();

  if (!infoPage) return null;
  const page = INFO_PAGES[infoPage];
  if (!page) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) closeInfo(); }}>
      <div className="modal-box info-modal-box">
        <button className="modal-close" onClick={closeInfo}><Icon name="x" /></button>
        <div className="modal-body info-modal-body">
          <h2 className="info-modal-title">{page.title}</h2>
          {page.sections.map((s, i) => (
            <div className="info-modal-section" key={i}>
              {s.heading && <h4>{s.heading}</h4>}
              {s.body && <p>{s.body}</p>}
              {s.list && (
                <ul>
                  {s.list.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
