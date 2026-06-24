import { useEffect, useRef } from 'react';

export default function ShinyText({ children, className = '', duration = 3 }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;
    const el = textRef.current;
    el.style.animation = `shinyText ${duration}s ease-in-out infinite`;
  }, [duration]);

  return (
    <span
      ref={textRef}
      className={className}
      style={{
        background: 'linear-gradient(110deg, var(--text-dark) 33%, var(--gold) 50%, var(--text-dark) 67%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
}
