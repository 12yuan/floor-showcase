import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function TextSplit({ text, className = '', tag = 'span', splitBy = 'chars' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = splitBy === 'chars'
      ? text.split('').map((char, i) => (
        <span key={i} className="text-split-item" style={{ display: 'inline-block', opacity: 0, transform: 'translateY(20px)' }}>
          {char === ' ' ? ' ' : char}
        </span>
      ))
      : text.split(' ').map((word, i) => (
        <span key={i} className="text-split-item" style={{ display: 'inline-block', marginRight: '0.3em', opacity: 0, transform: 'translateY(20px)' }}>
          {word}
        </span>
      ));

    el.innerHTML = '';
    items.forEach((item) => el.appendChild(typeof item === 'string' ? document.createTextNode(item) : createReactNode(item)));

    // GSAP stagger animation
    const childElements = el.querySelectorAll('.text-split-item');
    gsap.to(childElements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.03,
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }, [text, splitBy]);

  return <tag ref={containerRef} className={`text-split ${className}`} />;
}

function createReactNode(element) {
  const div = document.createElement('span');
  div.className = element.props.className || '';
  div.style.cssText = Object.entries(element.props.style || {})
    .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}: ${v}`)
    .join('; ');
  div.innerHTML = element.props.children || '';
  return div;
}
