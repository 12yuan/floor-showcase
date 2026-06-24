import { useState } from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ProductCard from '../components/ProductCard';
import HomeDecorGallery from '../components/HomeDecorGallery';
import ScrollReveal from '../components/ui/ScrollReveal';
import { products, categories } from '../data/products';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <Hero />
      <Stats />

      <section className="section">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-label">Products</div>
            <h2 className="section-title">热门产品</h2>
            <p className="section-desc">精选各品类畅销地板，满足您不同的采购需求</p>
          </div>
        </ScrollReveal>

        <div className="category-filter">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <HomeDecorGallery />

      <section className="brand-story">
        <div className="brand-grid">
          <ScrollReveal direction="right">
            <div className="brand-image">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop"
                alt="工厂"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="left">
            <div className="brand-text">
              <h3>15年专注<br />地板供应链服务</h3>
              <div className="brand-divider" />
              <p>
                我们与国内外多家知名地板工厂建立了长期战略合作关系，产品线覆盖实木地板、强化地板、瓷砖地砖、PVC地板、竹木地板等全品类地面材料。
              </p>
              <p>
                多年来，我们服务了超过500个大型工程项目，合作客户涵盖万科、碧桂园等知名房地产企业，以及数百家装饰公司和经销商。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="why-us">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-label">Why Us</div>
            <h2 className="section-title">为什么选择我们</h2>
            <p className="section-desc">品质为本，服务至上</p>
          </div>
        </ScrollReveal>
        <div className="why-grid">
          {[
            { icon: '🏭', title: '工厂直供', desc: '与多家一线品牌工厂深度合作，省去中间环节，价格更具竞争力' },
            { icon: '📦', title: '库存充足', desc: '常备库存超过10万㎡，常规品类48小时发货，定制产品15天交货' },
            { icon: '🔬', title: '品质保障', desc: '所有产品通过国家3C认证，环保等级达E0/E1标准，支持第三方检测' },
            { icon: '🚚', title: '物流覆盖', desc: '全国物流配送网络，大件物流专线直达工地，提供上门安装指导' },
          ].map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <div className="why-item">
                <div className="why-icon">{item.icon}</div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
