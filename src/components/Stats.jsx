import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const itemsRef = useRef([]);
  const [numbers, setNumbers] = useState([0, 0, 0, 0]);

  const targets = [15, 500, 50, 98];
  const suffixes = ['+', '+', '+', '%'];
  const labels = ['年行业经验', '合作工程案例', '产品品类', '客户满意度'];

  useEffect(() => {
    itemsRef.current.forEach((el, i) => {
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: targets[i],
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              setNumbers((prev) => {
                const next = [...prev];
                next[i] = Math.round(this.targets()[0].val);
                return next;
              });
            },
          });
        },
        once: true,
      });
    });
  }, []);

  return (
    <section className="stats-section">
      <div className="stats-grid">
        {targets.map((_, i) => (
          <div
            key={labels[i]}
            className="stat-item"
            ref={(el) => (itemsRef.current[i] = el)}
          >
            <div className="stat-number">
              {numbers[i]}{suffixes[i]}
            </div>
            <div className="stat-label">{labels[i]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
