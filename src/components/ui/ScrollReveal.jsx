import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }) {
  const elRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const dirMap = {
      up: { y: 60, x: 0 },
      down: { y: -60, x: 0 },
      left: { y: 0, x: 60 },
      right: { y: 0, x: -60 },
      none: { y: 0, x: 0 },
    };

    const { y, x } = dirMap[direction] || dirMap.up;

    gsap.set(el, { opacity: 0, y, x, scale: direction === 'none' ? 0.95 : 1 });

    const tl = gsap.to(el, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });

    return () => tl.kill();
  }, [delay, direction]);

  return <div ref={elRef} className={className}>{children}</div>;
}
