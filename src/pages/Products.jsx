import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ui/ScrollReveal';
import { products, categories } from '../data/products';

export default function Products() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCat);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section className="section" style={{ paddingTop: '140px' }}>
      <ScrollReveal>
        <div className="section-header">
          <div className="section-label">Catalog</div>
          <h2 className="section-title">产品中心</h2>
          <p className="section-desc">全品类地板产品，满足工程、家装、商用等不同场景需求</p>
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
  );
}
