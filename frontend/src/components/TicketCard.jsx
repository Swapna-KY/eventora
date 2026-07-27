import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import Icon from './Icon';
import { inr } from '../api/mappers';
import '../styles/ticket.css';

export default function TicketCard({ booking }) {
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const ticketRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    // Structured JSON payload - a real scanner (or any QR reader app) resolves this to
    // actual ticket data, not just an unstructured text dump.
    const payload = JSON.stringify({
      type: 'eventhub_ticket',
      bookingRef: booking.bookingReference,
      event: booking.eventTitle,
      city: booking.eventCity,
      date: booking.eventDate,
      ticketType: booking.type,
      quantity: booking.qty,
    });

    QRCode.toDataURL(payload, { width: 240, margin: 1, color: { dark: '#171331', light: '#ffffff' } })
      .then((url) => { if (!cancelled) setQrDataUrl(url); })
      .catch(() => { if (!cancelled) setQrDataUrl(null); });

    return () => { cancelled = true; };
  }, [booking]);

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    setDownloading(true);
    try {
      // Loaded on demand (not bundled into the initial page load) since it's only needed
      // when someone actually clicks Download.
      const { default: html2canvas } = await import('html2canvas');
      // Capture the entire ticket card (details + QR), not just the QR image -
      // this is what "Download" should actually produce.
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `eventhub-ticket-${booking.bookingReference}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      // Fall back to just the QR code if the full-card capture fails for any reason
      // (e.g. a blocked cross-origin event image) so Download still does something.
      if (qrDataUrl) {
        const link = document.createElement('a');
        link.download = `eventhub-ticket-qr-${booking.bookingReference}.png`;
        link.href = qrDataUrl;
        link.click();
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <div className="ticket-full" ref={ticketRef}>
        <div className="ticket-full-main">
          <span className="ticket-eyebrow">E-Ticket</span>
          <h3>{booking.eventTitle}</h3>
          <div className="ticket-full-meta">
            <span><Icon name="pin" /> {booking.eventCity}</span>
            <span><Icon name="cal" /> {booking.eventDate}</span>
          </div>
          <div className="ticket-full-grid">
            <div><span>Booking ID</span><strong>{booking.bookingReference}</strong></div>
            <div><span>Ticket type</span><strong>{booking.type}</strong></div>
            <div><span>Quantity</span><strong>{booking.qty}</strong></div>
            <div><span>Amount paid</span><strong>{inr(booking.amount)}</strong></div>
          </div>
        </div>
        <div className="ticket-full-notch" />
        <div className="ticket-full-qr">
          {qrDataUrl ? <img src={qrDataUrl} alt="Ticket QR code" /> : <div className="ticket-qr-placeholder">Generating QR...</div>}
        </div>
      </div>
      <button className="btn btn-ghost btn-sm ticket-download-btn" onClick={handleDownload} disabled={!qrDataUrl || downloading}>
        <Icon name="download" /> {downloading ? 'Preparing...' : 'Download Ticket'}
      </button>
    </div>
  );
}
