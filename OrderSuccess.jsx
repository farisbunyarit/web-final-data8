// src/pages/OrderSuccess.jsx (النسخة النهائية مع جلب البيانات من API)

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // إعادة تفعيل Hook useLocation

function OrderSuccess() {
    // 1. تعريف حالة لتخزين بيانات الطلب وحالة التحميل
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // 2. استخدام Hook useLocation للحصول على رقم الطلب من الـ URL
    const location = useLocation();
    
    // 3. استخدام Hook useEffect لجلب البيانات عند تحميل المكون
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const orderId = queryParams.get('order'); // قراءة رقم الطلب من URL
        
        if (!orderId) {
            setLoading(false);
            setError("Missing Order ID in the URL. Please check the link.");
            return;
        }

        // المسار إلى ملف PHP API الحقيقي الذي سيتم توجيهه عبر الـ Proxy
        // (Vite سيحوّل هذا إلى http://localhost/code/order_success.php?order=...)
        const API_URL = `/api/code/order_success.php?order=${orderId}`; 
        
        fetch(API_URL)
            .then(response => {
                // التأكد أن الرد كان ناجحاً قبل محاولة قراءة JSON
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // تخزين البيانات
                if (data.found) {
                    setOrderData(data);
                } else if (data.error) {
                    setError(`API Error: ${data.error}`);
                }
                 else {
                    setError("Order not found in the database or empty response.");
                }
            })
            .catch(err => {
                // عرض أي خطأ في الاتصال أو تحليل JSON
                setError(`Failed to fetch order data: ${err.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [location.search]); // إعادة الجلب إذا تغيرت مُعاملات الـ URL

    // --- منطق العرض (JSX) ---

    if (loading) {
        return <div className="loading-box">جاري تحميل تفاصيل الطلب...</div>;
    }

    // عرض رسائل الخطأ
    if (error) {
        return (
            <div className="success-box error-style" style={{backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', color: '#721c24'}}>
                <h2>❌ خطأ في تحميل الطلب</h2>
                <p>{error}</p>
                <p>تأكد من أن خادم PHP يعمل وأن رقم الطلب صحيح.</p>
            </div>
        );
    }
    
    // العرض عند نجاح جلب البيانات
    return (
        <div className="order-success-page">
            <div className="success-box">
                <h2>🎉 تم تأكيد الطلب بنجاح!</h2>
                <p>شكرًا لطلبك. رقم طلبك هو: **#{orderData.order_id}**.</p>
            </div>

            <div className="details-box">
                <h3>ملخص الطلب</h3>
                {/* استخدام البيانات الحقيقية التي تم جلبها */}
                <p><strong>الإجمالي المدفوع:</strong> {parseFloat(orderData.total_price).toFixed(2)} Baht</p>
                <p><strong>تاريخ الطلب:</strong> {orderData.order_date ?? 'N/A'}</p>
                
                <h4>المنتجات المشتراة:</h4>
                <ul>
                    {/* التأكد من وجود orderData.items قبل محاولة العرض */}
                    {orderData.items && orderData.items.map((item, index) => (
                        <li key={index}>
                            المنتج رقم {item.product_id} - الكمية: {item.quantity} 
                            (السعر عند الطلب: {parseFloat(item.price_at_order).toFixed(2)} Baht)
                        </li>
                    ))}
                </ul>
            </div>

            <a href="/web" className="btn-home">العودة إلى صفحة المنتجات</a>
        </div>
    );
}

export default OrderSuccess;