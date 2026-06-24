import { useState } from 'react';
import { Link } from 'react-router-dom';
import SpotlightCard from './ui/SpotlightCard';
import TiltEffect from './ui/TiltEffect';
import ScrollReveal from './ui/ScrollReveal';
import { getColorSwatches, colorNames } from '../utils/woodTextures';

const categoryLabels = {
  wood: '实木地板',
  laminate: '强化地板',
  tile: '瓷砖地砖',
  pvc: 'PVC地板',
  bamboo: '竹木地板',
};

const fallbackGradients = {
  wood: 'linear-gradient(135deg, #8B6914 0%, #D4A574 40%, #A0522D 70%, #5C4033 100%)',
  laminate: 'linear-gradient(135deg, #B8A888 0%, #D4C0A0 40%, #C8B89A 70%, #A09070 100%)',
  tile: 'linear-gradient(135deg, #E8E4DE 0%, #D0CCC6 40%, #C8B89A 70%, #B8B0A4 100%)',
  pvc: 'linear-gradient(135deg, #B8B0A8 0%, #A8A098 40%, #908880 70%, #787068 100%)',
  bamboo: 'linear-gradient(135deg, #6B5B4F 0%, #8B7D6B 40%, #A89A88 70%, #5A4B3A 100%)',
};

export default function ProductCard({ product }) {
  const { id, name, category, price, unit, image, features } = product;
  const [imgError, setImgError] = useState(false);
  const swatches = getColorSwatches(category);

  return (
    <ScrollReveal>
      <TiltEffect>
        <SpotlightCard>
          <Link to={`/products/${id}`} className="product-card">
            <div className="product-card-image-wrap">
              {!imgError ? (
                <img src={image} alt={name} loading="lazy" onError={() => setImgError(true)} />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: fallbackGradients[category] || fallbackGradients.wood,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', letterSpacing: '2px' }}>{name}</span>
                </div>
              )}
              <div className="product-card-overlay">
                <div className="product-card-overlay-bg" />
                <div className="overlay-content">
                  <div className="overlay-price">
                    ¥{price}<small> {unit}</small>
                  </div>
                  <Link to={`/inquiry?product=${id}`} className="overlay-cta" onClick={(e) => e.stopPropagation()}>
                    询问底价
                  </Link>
                </div>
              </div>
            </div>

            <div className="product-card-body">
              <div className="product-card-category">{categoryLabels[category]}</div>
              <h3 className="product-card-name">{name}</h3>
              <div className="product-card-features">
                {features.map((f) => (
                  <span key={f} className="product-card-feature">{f}</span>
                ))}
              </div>
              <div className="color-swatches">
                {swatches.slice(0, 5).map((swatch, i) => {
                  const n = swatch.name || colorNames[swatch] || '色';
                  return (
                    <div
                      key={i}
                      className="swatch"
                      data-name={n}
                      style={{ background: swatch.base }}
                    />
                  );
                })}
                <span style={{ fontSize: '11px', color: 'var(--text-light)', marginLeft: '4px' }}>
                  {swatches.length}色可选
                </span>
              </div>
            </div>
          </Link>
        </SpotlightCard>
      </TiltEffect>
    </ScrollReveal>
  );
}
