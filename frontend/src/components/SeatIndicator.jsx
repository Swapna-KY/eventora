// Seat-availability tiers. We only have *remaining* seats from the backend (no stored
// original capacity), so this is an honest tiered indicator rather than a literal "X of Y" ratio.
function getTier(seats) {
  if (seats <= 0) return { key: 'sold-out', label: 'Sold out', fill: 0 };
  if (seats < 60) return { key: 'low', label: 'Selling fast', fill: 22 };
  if (seats < 150) return { key: 'mid', label: 'Filling up', fill: 58 };
  return { key: 'high', label: 'Good availability', fill: 100 };
}

export default function SeatIndicator({ seats, size = 'sm' }) {
  const tier = getTier(seats);
  return (
    <div className={`seat-indicator seat-indicator-${size}`}>
      <div className="seat-indicator-top">
        <span className={`seat-indicator-label ${tier.key}`}>{tier.label}</span>
        <span className="seat-indicator-count">{seats} seats left</span>
      </div>
      <div className="seat-indicator-track">
        <div className={`seat-indicator-fill ${tier.key}`} style={{ width: `${tier.fill}%` }} />
      </div>
    </div>
  );
}
