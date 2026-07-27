import { useEffect, useState } from 'react';
import Icon from '../components/Icon';
import { inr } from '../api/mappers';
import { fetchAnalytics } from '../api/analytics';
import { useToast } from '../context/ToastContext';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function BarChart({ data, labels, emptyMessage }) {
  const max = Math.max(...data, 1);
  if (!data.length) return <p style={{ fontSize: 13, color: 'var(--gray-500)', padding: '20px 0' }}>{emptyMessage}</p>;
  return (
    <div className="bar-chart">
      {data.map((v, i) => (
        <div className="bar-col" key={i}>
          <div className="bar-fill" style={{ height: Math.round((v / max) * 150) + 20 }} />
          <span>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminAnalyticsPanel() {
  const [data, setData] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetchAnalytics().then(setData).catch((err) => showToast(err.message));
  }, [showToast]);

  if (!data) return <div className="dash-panel active"><div className="dash-head"><h2>Analytics Overview</h2></div></div>;

  const categories = Object.keys(data.seatsByCategory || {}).slice(0, 6);
  const categoryValues = categories.map((c) => data.seatsByCategory[c]);
  const categoryLabels = categories.map((c) => c.split(' ')[0]);

  return (
    <div className="dash-panel active">
      <div className="dash-head"><div><h2>Analytics Overview</h2><p>Performance across all events on EventHub.</p></div></div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top"><div className="kpi-ic"><Icon name="rupee" /></div><span className="kpi-delta">+18%</span></div>
          <div className="kpi-num">{inr(data.totalRevenue)}</div><div className="kpi-label">Total Revenue</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-top"><div className="kpi-ic"><Icon name="ticket" /></div><span className="kpi-delta">+9%</span></div>
          <div className="kpi-num">{data.totalTicketsSold}</div><div className="kpi-label">Tickets Sold</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-top"><div className="kpi-ic"><Icon name="cal" /></div><span className="kpi-delta">Live</span></div>
          <div className="kpi-num">{data.activeEvents}</div><div className="kpi-label">Active Events</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-top"><div className="kpi-ic"><Icon name="users" /></div><span className="kpi-delta">+4.2%</span></div>
          <div className="kpi-num">{data.conversionRate}%</div><div className="kpi-label">Conversion Rate</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 22 }}>
        <div className="chart-card">
          <h4 style={{ fontSize: 15, marginBottom: 4 }}>Bookings — last 7 days</h4>
          <p style={{ fontSize: 12.5, color: 'var(--gray-500)' }}>Daily ticket sales across all events</p>
          <BarChart data={data.bookingsLast7Days || []} labels={DAYS} emptyMessage="No bookings yet." />
        </div>
        <div className="chart-card">
          <h4 style={{ fontSize: 15, marginBottom: 4 }}>Seats sold by category</h4>
          <p style={{ fontSize: 12.5, color: 'var(--gray-500)' }}>Where demand is highest</p>
          <BarChart data={categoryValues} labels={categoryLabels} emptyMessage="No bookings yet — sell a few tickets to see this chart fill in." />
        </div>
      </div>
    </div>
  );
}
