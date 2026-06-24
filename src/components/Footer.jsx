import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>优选地板</h3>
          <p>专业地板供应商，为家装公司、工程项目、经销商提供全品类地板采购服务。品质保障，工厂直供，价格透明。</p>
        </div>
        <div className="footer-col">
          <h4>产品分类</h4>
          <ul>
            <li><Link to="/products?cat=wood">实木地板</Link></li>
            <li><Link to="/products?cat=laminate">强化地板</Link></li>
            <li><Link to="/products?cat=tile">瓷砖地砖</Link></li>
            <li><Link to="/products?cat=pvc">PVC地板</Link></li>
            <li><Link to="/products?cat=bamboo">竹木地板</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>服务支持</h4>
          <ul>
            <li><Link to="/inquiry">在线询盘</Link></li>
            <li><Link to="/products">样品申请</Link></li>
            <li><Link to="/about">物流配送</Link></li>
            <li><Link to="/about">售后保障</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>联系我们</h4>
          <ul>
            <li>400-888-8888</li>
            <li>inquiry@floor.com</li>
            <li>广东省佛山市</li>
            <li>周一至周六 9:00-18:00</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 优选地板 All Rights Reserved. | 粤ICP备XXXXXXXX号
      </div>
    </footer>
  );
}
