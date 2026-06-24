import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import SilkBackground from './ui/SilkBackground';

export default function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);
  const eyebrowRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
      .to('.hero-line-inner', { y: 0, duration: 1, stagger: 0.15, ease: 'power4.out' }, '-=0.4')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');

    return () => tl.kill();
  }, []);

  return (
    <section className="hero-section">
      <SilkBackground />

      <div className="hero-content">
        <div ref={eyebrowRef} className="hero-eyebrow" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          SINCE 2010 · 专业地板供应链
        </div>

        <h1 className="hero-title" ref={titleRef}>
          <span className="line">
            <span className="hero-line-inner">品质地板 · 匠心之选</span>
          </span>
          <span className="line">
            <span className="hero-line-inner">一站式采购平台</span>
          </span>
        </h1>

        <p ref={subtitleRef} className="hero-subtitle" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          覆盖实木、强化、瓷砖、PVC、竹木等全品类地板产品<br />
          工厂直供，为家装公司、工程项目、经销商提供专业地面解决方案
        </p>

        <div ref={actionsRef} className="hero-actions" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          <Link to="/products" className="btn-primary">浏览产品目录</Link>
          <Link to="/inquiry" className="btn-outline">免费获取报价</Link>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span>SCROLL</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
