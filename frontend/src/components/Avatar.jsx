import '../styles/avatar.css';

export default function Avatar({ name, photoUrl, size = 42, onClick, className = '' }) {
  const commonStyle = { width: size, height: size, cursor: onClick ? 'pointer' : 'default' };

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name || 'Profile'}
        onClick={onClick}
        className={`avatar-img ${className}`}
        style={commonStyle}
      />
    );
  }

  const letter = (name && name.trim() ? name.trim().charAt(0) : 'S').toUpperCase();
  return (
    <div
      onClick={onClick}
      className={`avatar-initial ${className}`}
      style={{ ...commonStyle, fontSize: size * 0.42 }}
      aria-label={name || 'Profile'}
    >
      {letter}
    </div>
  );
}
