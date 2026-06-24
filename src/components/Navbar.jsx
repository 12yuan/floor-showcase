import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="navbar-logo">
        <div className="logo-mark">木</div>
        优选地板
      </Link>
      <ul className="navbar-links">
        <li><Link to="/" className={isActive('/')}>首页</Link></li>
        <li><Link to="/products" className={isActive('/products')}>产品中心</Link></li>
        <li><Link to="/inquiry" className={isActive('/inquiry')}>在线询盘</Link></li>
        <li><Link to="/about" className={isActive('/about')}>关于我们</Link></li>
      </ul>
      <Link to="/inquiry" className="nav-cta">立即询盘</Link>
    </nav>
  );
}
