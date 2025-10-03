// src/pages/ProductList.jsx

import React, { useState, useEffect } from 'react';

// 1. استيراد جميع المكونات التي تم إنشاؤها
import Header from '../components/Header';
import Footer from '../components/Footer';
import Slideshow from '../components/Slideshow';
import BestSellers from '../components/BestSellers';
import ContactForm from '../components/ContactForm';

function ProductList() {
    // حالة (State) لإدارة المنتجات وحالة التحميل
    const [products, setProducts] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleAddToCart = (productId) => {
        // هذه الدالة ستحتاج لاحقًا لإرسال طلب POST إلى cart_action.php
        // نستخدم console.log بدلاً من alert لتجنب مشاكل الـ iFrame
        console.log(`Adding product ${productId} to cart (ID: ${productId}).`);
    };
    
    // جلب المنتجات من API PHP عند تحميل المكون
    useEffect(() => {
        // المسار /api/code/web.php سيوجه عبر الـ Proxy إلى خادم PHP
        const API_URL = '/api/code/web.php'; 

        fetch(API_URL)
            .then(res => {
                if (!res.ok) throw new Error('Network error or server down');
                return res.json();
            })
            .then(data => {
                if (data.status === 'success' && Array.isArray(data.products)) {
                    setProducts(data.products); 
                } else {
                    setError('Invalid data format received from API. Check your PHP JSON structure.');
                }
            })
            .catch(err => {
                // قد يكون هذا الخطأ ناتجًا عن أن PHP لا يزال يرسل HTML وليس JSON
                setError(`Failed to fetch products: ${err.message}. If the error is "JSON parse error", check if web.php is sending pure JSON.`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // 2. شروط العرض (التحميل والخطأ)
    if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>جاري تحميل قائمة المنتجات...</h2>;
    if (error) return <h2 style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>خطأ في البيانات: {error}</h2>;

    return (
        // 3. تجميع الواجهة الكاملة بالترتيب
        <> 
            {/* 1. رأس الصفحة وشريط التنقل */}
            <Header /> 

            {/* قسم البحث وعربة التسوق */}
            <section id="search-section" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <input type="text" id="search-input" placeholder="Search for products..." style={{ flexGrow: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px' }} />
                <a href="/cart" id="shopping-cart-btn" style={{ textDecoration: 'none', padding: '10px 15px', backgroundColor: '#28a745', color: 'white', borderRadius: '5px' }}>
                    Shopping Cart
                </a>
            </section>
            
            {/* 2. عرض الشرائح (Slideshow) */}
            <Slideshow />

            {/* 3. قسم المنتجات (يستخدم البيانات المجلوبة) */}
            <section id="products" className="products" style={{ padding: '20px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Our Products</h2>
                <div className="product-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {products.length > 0 ? (
                        products.map(product => (
                            <div key={product.id} className="product-card">
                                {/* استخدام classNames التي تم جلبها من web.css */}
                                <img src={product.image_url} alt={product.name} />
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <span className="price">{product.price} Baht</span>
                                    
                                    <button 
                                        onClick={() => handleAddToCart(product.id)} 
                                        className="btn-primary"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>لا توجد منتجات لعرضها حالياً.</p>
                    )}
                </div>
            </section>
            
            {/* 4. مكون أفضل المبيعات والفيديوهات والعروض */}
            <BestSellers />

            {/* قسم مراجعات العملاء (ثابت) */}
            <section id="reviews" className="reviews" style={{padding: '20px', textAlign: 'center'}}>
                <h2>Customer Reviews</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                    <div style={{ border: '1px solid #ddd', padding: '15px', width: '30%' }}>"منتجات ذات جودة عالية وخدمة توصيل سريعة!" - محمد</div>
                    <div style={{ border: '1px solid #ddd', padding: '15px', width: '30%' }}>"الخوذة تناسبني تمامًا، أنصح بها بشدة." - خالد</div>
                </div>
            </section>

            {/* 5. مكون نموذج الاتصال */}
            <ContactForm />
            
            {/* قسم الطقس وعدد الزوار (محتوى وهمي حاليًا) */}
            <section className="weather-container" style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f9f9f9' }}>
                <p>عدد الزوار: 1250 | الطقس: مشمس، 35 درجة مئوية</p>
            </section>
            
            {/* 6. تذييل الصفحة وزر العودة للأعلى */}
            <Footer />
        </>
    );
}

export default ProductList;
