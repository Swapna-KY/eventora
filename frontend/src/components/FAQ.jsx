import { useState } from 'react';
import Icon from './Icon';
import useReveal from '../hooks/useReveal';
import { FAQS } from '../data/staticContent';
import '../styles/sections.css';

export default function FAQ() {
  const headRef = useReveal();
  const listRef = useReveal();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-head center reveal" ref={headRef}>
          <p className="eyebrow">Good to know</p>
          <h2>Frequently asked <span className="text-grad">questions</span></h2>
        </div>
        <div className="faq-list reveal" ref={listRef}>
          {FAQS.map((f, i) => {
            const open = openIndex === i;
            return (
              <div className={`faq-item ${open ? 'open' : ''}`} key={f.q}>
                <div className="faq-q" onClick={() => setOpenIndex(open ? null : i)}>
                  <span>{f.q}</span>
                  <Icon name="chev-d" />
                </div>
                <div className="faq-a" style={{ maxHeight: open ? '300px' : '0px' }}>
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
