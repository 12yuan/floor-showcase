import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ScrollReveal from '../components/ui/ScrollReveal';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { getColorSwatches, colorNames } from '../utils/woodTextures';

const categoryLabels = {
  wood: '实木地板',
  laminate: '强化地板',
  tile: '瓷砖地砖',
  pvc: 'PVC地板',
  bamboo: '竹木地板',
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [activeColor, setActiveColor] = useState(0);
  const [imgError, setImgError] = useState(false);

  if (!product) {
    return (
      <div className="section" style={{ textAlign: 'center', paddingTop: '200px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--wood-deep)' }}>产品未找到</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '16px' }}>请返回产品列表查看其他产品</p>
        <Link to="/products" className="btn-primary" style={{ display: 'inline-block', marginTop: '32px' }}>返回产品列表</Link>
      </div>
    );
  }

  const swatches = getColorSwatches(product.category);
  const activeSwatch = swatches[activeColor] || swatches[0];
  const swatchName = activeSwatch.name || colorNames[activeSwatch] || '';

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="product-detail-page">
      <ScrollReveal>
        <Link to="/products" className="detail-back">← 返回产品列表</Link>
      </ScrollReveal>

      <div className="detail-grid">
        <ScrollReveal direction="right">
          <div className="detail-image-section">
            <div className="detail-main-image">
              {!imgError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  onError={() => setImgError(true)}
                  style={{
                    filter: activeColor > 0 ? `hue-rotate(${activeColor * 30}deg) saturate(${0.8 + activeColor * 0.1})` : 'none',
                  }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(135deg, #8B6914 0%, #D4A574 40%, #A0522D 70%, #5C4033 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', letterSpacing: '2px' }}>{product.name}</span>
                </div>
              )}
            </div>
            <div className="detail-color-picker">
              {swatches.slice(0, 5).map((swatch, i) => {
                const name = swatch.name || colorNames[swatch] || '色';
                return (
                  <div
                    key={i}
                    className={`swatch ${activeColor === i ? 'active' : ''}`}
                    data-name={name}
                    style={{ background: swatch.base }}
                    onClick={() => setActiveColor(i)}
                  />
                );
              })}
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px' }}>
                {swatchName}
              </span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="left">
          <div className="detail-info">
            <div className="detail-category-label">{categoryLabels[product.category]}</div>
            <h1>{product.name}</h1>
            <div className="detail-price">
              ¥{product.price}<small> {product.unit}</small>
            </div>
            <p className="detail-desc">{product.description}</p>

            <div className="detail-features">
              {product.features.map((f) => (
                <span key={f} className="detail-feature">✓ {f}</span>
              ))}
            </div>

            <div className="detail-specs">
              <h3>产品规格</h3>
              {[
                ['材质', product.specs.material],
                ['规格尺寸', product.specs.size],
                ['环保等级', product.specs.grade],
                ['表面处理', product.specs.surface],
                ['质保期限', product.specs.warranty],
                ['起订量', `${product.minOrder} ㎡起`],
              ].map(([label, value]) => (
                <div key={label} className="spec-row">
                  <span className="spec-label">{label}</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>

            <Link to={`/inquiry?product=${product.id}`}>
              <button className="btn-inquiry-lg">询问底价 · 获取专属报价</button>
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {relatedProducts.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '64px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--wood-deep)', marginBottom: '32px', textAlign: 'center' }}>
            同系列推荐
          </h3>
          <div className="product-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
