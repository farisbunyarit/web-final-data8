// src/components/Slideshow.jsx
import React, { useState, useEffect } from 'react';

const slideImages = [
    "https://placehold.co/900x400/af0000/ffffff?text=Motorcycle+Gear",
    "https://placehold.co/900x400/000000/ffffff?text=New+Parts+Arrived",
    "https://placehold.co/900x400/333333/ffffff?text=Big+Sale+Soon"
];

function Slideshow() {
    const [slideIndex, setSlideIndex] = useState(1);

    // دالة للتحرك يمين/يسار
    const plusSlides = (n) => {
        let newIndex = slideIndex + n;
        if (newIndex > slideImages.length) { newIndex = 1 }
        if (newIndex < 1) { newIndex = slideImages.length }
        setSlideIndex(newIndex);
    };

    // دالة للنقر على النقطة
    const currentSlide = (n) => {
        setSlideIndex(n);
    };

    // useEffect لتشغيل التمرير التلقائي (يحل محل JavaScript العادي)
    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIndex(prevIndex => {
                let newIndex = prevIndex + 1;
                if (newIndex > slideImages.length) { newIndex = 1 }
                return newIndex;
            });
        }, 5000); // 5 ثوانٍ لكل شريحة

        // تنظيف المؤقت عند إزالة المكون
        return () => clearInterval(timer);
    }, []); 

    return (
        <>
            <h2 style={{ textAlign: "center" }}>Come Soon !!</h2>

            <div className="slideshow-container">
                {slideImages.map((src, index) => (
                    <div 
                        key={index} 
                        className={`mySlides fade ${slideIndex === index + 1 ? 'active' : ''}`}
                        style={{ display: slideIndex === index + 1 ? 'block' : 'none' }}
                    >
                        <div className="numbertext">{index + 1} / {slideImages.length}</div>
                        <img src={src} style={{ width: "100%" }} alt={`Slide ${index + 1}`} />
                        <div className="text">Soon!!</div>
                    </div>
                ))}

                <a className="prev" onClick={() => plusSlides(-1)}>❮</a>
                <a className="next" onClick={() => plusSlides(1)}>❯</a>
            </div>
            <br />

            <div style={{ textAlign: "center" }}>
                {slideImages.map((_, index) => (
                    <span 
                        key={index} 
                        className={`dot ${slideIndex === index + 1 ? 'active' : ''}`} 
                        onClick={() => currentSlide(index + 1)}
                    ></span>
                ))}
            </div>
        </>
    );
}

export default Slideshow;
