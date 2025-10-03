// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';

function Footer() {
    const [isVisible, setIsVisible] = useState(false);

    // دالة للتحكم في ظهور الزر بناءً على موقع التمرير
    const toggleVisibility = () => {
        // الزر يظهر إذا تجاوز التمرير 300 بكسل من الأعلى
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // دالة للتمرير إلى أعلى الصفحة
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // useEffect لتثبيت وتفكيك مراقب حدث التمرير (Scrolling)
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        // تنظيف الحدث عند إزالة المكون لمنع تسرب الذاكرة
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {/* Customer Reviews Section */}
            <section id="reviews" className="reviews">
                <h2>Customer Reviews</h2>
                <div className="review">
                    <p>"Great quality parts, highly recommended!" - Ali</p>
                </div>
                <div className="review">
                    <p>"Fast delivery and excellent customer service!" - Sarah</p>
                </div>
                <div className="review">
                    <p>
                        "I’m very happy with the products I received, will definitely buy
                        again!" - Mohammed
                    </p>
                </div>
                <div className="review">
                    <p>"Affordable and reliable. Highly recommend the store." - Maya</p>
                </div>
            </section>
            
            {/* Footer Section */}
            <footer id="footer">
                <p>© 2025 Motorcycle Spare Parts Store</p>
            </footer>
            
            {/* زر العودة إلى الأعلى - يظهر فقط عندما تكون isVisible true */}
            <button
                id="goToTop" 
                onClick={scrollToTop}
                style={{
                    display: isVisible ? 'block' : 'none'
                }}
            >
                Go to Top
            </button>
        </>
    );
}

export default Footer;
