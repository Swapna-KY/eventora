export default function CardSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton shimmer skeleton-media" />
          <div className="skeleton-body">
            <div className="skeleton shimmer skeleton-line" style={{ width: '70%', height: 18 }} />
            <div className="skeleton shimmer skeleton-line" style={{ width: '45%', height: 13, marginTop: 12 }} />
            <div className="skeleton shimmer skeleton-line" style={{ width: '85%', height: 8, marginTop: 16 }} />
          </div>
        </div>
      ))}
    </>
  );
}
