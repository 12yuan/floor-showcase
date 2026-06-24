import { useRef, useCallback } from 'react';

export default function SpotlightCard({ children, className = '', spotlightColor = 'rgba(201, 169, 110, 0.15)' }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      style={{ '--spotlight-color': spotlightColor }}
    >
      <div className="spotlight-glow" />
      {children}
    </div>
  );
}
