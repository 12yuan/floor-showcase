import ScrollReveal from '../components/ui/ScrollReveal';

export default function About() {
  return (
    <section className="about-section">
      <ScrollReveal>
        <div className="section-header">
          <div className="section-label">About Us</div>
          <h2 className="section-title">关于我们</h2>
          <p className="section-desc">15年专注地板供应链服务</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="about-card">
          <h3>公司简介</h3>
          <p>
            优选地板成立于2010年，总部位于广东佛山，是一家集地板产品研发、生产、销售、服务于一体的综合性供应商。
            我们与国内外多家知名地板工厂建立了长期战略合作关系，产品线覆盖实木地板、强化地板、瓷砖地砖、PVC地板、
            竹木地板等全品类地面材料。
          </p>
          <p>
            多年来，我们服务了超过500个大型工程项目，合作客户涵盖万科、碧桂园、恒大等知名房地产企业，
            以及数百家装饰公司和经销商。我们始终坚持"品质为本、服务至上"的经营理念。
          </p>
        </div>
      </ScrollReveal>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <ScrollReveal direction="right">
          <div className="about-card">
            <h3>企业愿景</h3>
            <p>成为中国最值得信赖的地板供应链服务商，让每一位客户都能享受到品质可靠、价格合理的地板产品。</p>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="left">
          <div className="about-card">
            <h3>合作模式</h3>
            <p>支持工程直供、经销商批发、OEM/ODM定制、出口贸易等多种合作模式，灵活满足不同客户的采购需求。</p>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="about-card">
          <h3 style={{ textAlign: 'center', marginBottom: '40px' }}>服务流程</h3>
          <div className="about-timeline">
            {[
              { step: '01', title: '需求沟通', desc: '了解客户采购需求，匹配最佳方案' },
              { step: '02', title: '产品推荐', desc: '根据用途、预算推荐合适的产品系列' },
              { step: '03', title: '样品确认', desc: '寄送实物样品供客户确认色号和质感' },
              { step: '04', title: '签订合同', desc: '确认订单细节，签订采购合同' },
              { step: '05', title: '生产备货', desc: '工厂排产，严格质量把控' },
              { step: '06', title: '物流配送', desc: '安排物流送货上门，提供安装指导' },
            ].map((item) => (
              <div key={item.step} className="timeline-step">
                <h4>Step {item.step} · {item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
