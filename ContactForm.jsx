// src/components/ContactForm.jsx
import React, { useState } from 'react';

function ContactForm() {
    // حالة لتخزين بيانات النموذج
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        phone: '',
        secretword: '',
        message: ''
    });

    // دالة لمعالجة التغييرات في حقول الإدخال
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // دالة لمعالجة إرسال النموذج (يرسل إلى contact.php)
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // إرسال البيانات عبر Fetch إلى مسار الـ API (الذي سيتم توجيهه عبر الـ Proxy)
        fetch('/api/includes/contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('تم إرسال رسالتك بنجاح! شكراً لتواصلك.'); 
            // يمكن إضافة منطق لإعادة تعيين النموذج: setFormData({ ... })
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('حدث خطأ أثناء الإرسال. تأكد من إعداد contact.php API والـ Proxy.');
        });
    };

    return (
        <section id="contact">
            <h2>Contact Me</h2>
            <form id="contactForm" onSubmit={handleSubmit} method="POST">
                
                <input type="text" name="name" placeholder="Your Name" required title="Please enter your name." onChange={handleChange} value={formData.name} />
                <input type="text" name="subject" placeholder="Subject" required title="Please enter a subject." onChange={handleChange} value={formData.subject} />
                <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Phone Number" 
                    pattern="\d{10}" 
                    required
                    title="Phone number must contain only 10 digits." 
                    onChange={handleChange} 
                    value={formData.phone} 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    required 
                    pattern="[a-zA-Z0-9._%+-]+@ftu\.ac\.th"
                    title="Email must be from @ftu.ac.th domain." 
                    onChange={handleChange} 
                    value={formData.email} 
                />
                
                <input 
                    type="password" 
                    name="secretword" 
                    placeholder="Secret Word" 
                    required
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
                    title="Password must have at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long." 
                    onChange={handleChange} 
                    value={formData.secretword} 
                />

                <textarea name="message" placeholder="Your Message" required title="Please enter your message." onChange={handleChange} value={formData.message}></textarea>

                <button type="submit">Send</button>
            </form>

             {/* Visit Count and Weather (Static content) */}
            <div className="count">
                <h4 id="h4">Visitor Count</h4>
                <img src="https://placehold.co/100x20/cccccc/000000?text=Counter" title="Counters" alt="Counters" border="0" className="counter-img" />
            </div>

            <section className="weather-container">
                <div id="temp" className="temp">35°C</div>
                <div id="condition" className="condition">مشمس</div>
                <div id="humidity" className="humidity">40%</div>
                <div id="wind" className="wind">15 كم/س</div>
                <div id="feelslike" className="feelslike">38°C</div>
                <img id="weather-icon" src="https://placehold.co/50x50/cccccc/000000?text=☀️" alt="Weather Icon" />
            </section>
        </section>
    );
}

export default ContactForm;
