// src/components/BestSellers.jsx
import React from 'react';

function BestSellers() {
    return (
        <>
            {/* Best Sellers Section */}
            <section id="bestsellers" className="best-sellers">
                <h2>Best Sellers</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Motorcycle Helmet</td>
                            <td>4,700 Baht</td>
                            <td>320</td>
                        </tr>
                        <tr>
                            <td>Brake Disc Rotor</td>
                            <td>1,800 Baht</td>
                            <td>280</td>
                        </tr>
                        <tr>
                            <td>Throttle Grip</td>
                            <td>650 Baht</td>
                            <td>150</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Video Section */}
            <section id="video" className="video">
                <h2>Watch Our Product Video</h2>
                {/* تم استخدام فيديو تعليمي كمثال، يمكن استبداله بفيديو المنتجات الخاص بك */}
                <iframe width="560" height="315" src="https://www.youtube.com/embed/qTur4tZHDus?si=H7tkN_BEzqZoSZI0"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
            </section>

            {/* Special Offers Section */}
            <section id="offers" className="offers">
                <div className="offer-card">
                    <h3>20% Off All Products!</h3>
                    <p>Use code "FIRE20" at checkout.</p>
                </div>
                <div className="offer-card">
                    <h3>Free Shipping on Orders over $500 Baht</h3>
                    <p>Shop now and get free shipping on orders above $100 Baht!</p>
                </div>
                <div className="offer-card">
                    <h3>Buy 2 Get 1 Free!</h3>
                    <p>Buy any two products and get the third free! Limited time offer.</p>
                </div>
            </section>
        </>
    );
}

export default BestSellers;
