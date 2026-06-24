import { useState } from 'react';
import ScrollReveal from './ui/ScrollReveal';
import { homeDecorScenes } from '../data/products';

function DecorItem({ scene, index }) {
  const [error, setError] = useState(false);

  return (
    <ScrollReveal delay={index * 0.05}>
      <div className="decor-item">
        {!error ? (
          <img src={scene.image} alt={scene.title} loading="lazy" onError={() => setError(true)} />
        ) : (
          <div style={{
            width: '100%', minHeight: '250px',
            background: 'linear-gradient(135deg, #D4A574 0%, #C9A96E 50%, #8B6914 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', letterSpacing: '2px' }}>{scene.title}</span>
          </div>
        )}
        <div className="decor-item-overlay">
          <div className="decor-item-title">{scene.title}</div>
          <div className="decor-item-floor">搭配: {scene.floorType}</div>
          <div className="decor-item-tags">
            {scene.tags.map((tag) => (
              <span key={tag} className="decor-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function HomeDecorGallery() {
  return (
    <section className="decor-gallery">
      <div className="section-header" style={{ padding: '0 48px' }}>
        <div className="section-label">Home Decor</div>
        <h2 className="section-title">家装风格灵感</h2>
        <p className="section-desc">
          真实空间场景展示，看地板如何改变整个家的气质
        </p>
      </div>

      <div className="decor-masonry">
        {homeDecorScenes.map((scene, i) => (
          <DecorItem key={scene.id} scene={scene} index={i} />
        ))}
      </div>
    </section>
  );
}
