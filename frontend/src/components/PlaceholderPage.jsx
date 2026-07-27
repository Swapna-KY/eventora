import { useNavigation } from '../context/NavigationContext';

export default function PlaceholderPage({ title, description }) {
  const { goTo } = useNavigation();
  
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', paddingTop: 80, textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: 640 }}>
        <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, color: 'var(--ink)', marginBottom: 24, letterSpacing: '-0.02em' }}>
          {title}
        </h1>
        <p style={{ fontSize: 18, color: 'var(--gray-600)', marginBottom: 40, lineHeight: 1.6 }}>
          {description || "We are currently crafting this section to bring you the best experience possible. Please check back later!"}
        </p>
        <button 
          className="btn btn-primary" 
          style={{ padding: '14px 36px', borderRadius: 30, fontSize: 15, fontWeight: 600 }}
          onClick={() => goTo('home')}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
