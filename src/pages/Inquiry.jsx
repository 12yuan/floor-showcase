import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function Inquiry() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const selectedProduct = productId ? products.find((p) => p.id === parseInt(productId)) : null;

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    product: selectedProduct ? selectedProduct.name : '',
    quantity: '',
    purpose: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="inquiry-section">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-label">Inquiry</div>
            <h2 className="section-title">在线询盘</h2>
            <p className="section-desc">填写您的采购需求，我们将在24小时内与您联系</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <form className="inquiry-form-card" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <label>联系人 <span className="req">*</span></label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="请输入您的姓名" required />
              </div>
              <div className="form-field">
                <label>公司名称</label>
                <input name="company" value={form.company} onChange={handleChange} placeholder="请输入公司名称" />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label>联系电话 <span className="req">*</span></label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="请输入联系电话" required />
              </div>
              <div className="form-field">
                <label>电子邮箱</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="请输入邮箱地址" />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label>意向产品 <span className="req">*</span></label>
                <select name="product" value={form.product} onChange={handleChange} required>
                  <option value="">请选择产品类别</option>
                  <option value="实木地板">实木地板</option>
                  <option value="强化地板">强化地板</option>
                  <option value="瓷砖地砖">瓷砖地砖</option>
                  <option value="PVC地板">PVC地板</option>
                  <option value="竹木地板">竹木地板</option>
                  <option value="多品类综合">多品类综合</option>
                </select>
              </div>
              <div className="form-field">
                <label>采购数量</label>
                <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="如：500㎡ 或 1000片" />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field full">
                <label>采购用途</label>
                <select name="purpose" value={form.purpose} onChange={handleChange}>
                  <option value="">请选择用途</option>
                  <option value="家装零售">家装零售</option>
                  <option value="工程项目">工程项目</option>
                  <option value="经销商批发">经销商批发</option>
                  <option value="出口贸易">出口贸易</option>
                  <option value="其他">其他</option>
                </select>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field full">
                <label>详细需求</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="请描述您的具体需求，如：颜色偏好、规格要求、交货时间等" />
              </div>
            </div>

            <button type="submit" className="form-submit-btn">提交询盘</button>
          </form>
        </ScrollReveal>
      </section>

      {submitted && (
        <div className="modal-overlay" onClick={() => setSubmitted(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">✓</div>
            <h3>询盘提交成功</h3>
            <p>感谢您的信任，我们的采购顾问将在24小时内与您联系。</p>
            <button className="modal-close-btn" onClick={() => setSubmitted(false)}>确定</button>
          </div>
        </div>
      )}
    </>
  );
}
