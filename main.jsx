import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. استيراد المكونات المطلوبة من React Router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// 2. استيراد المكونات الأخرى
import OrderSuccess from './pages/OrderSuccess.jsx'; 
import ProductList from './pages/ProductList.jsx'; // <--- إضافة استيراد ProductList

// 3. تعريف المسارات (Routes)
const router = createBrowserRouter([
  {
    path: "/", // المسار الافتراضي (الصفحة الرئيسية)
    element: <App />, 
  },
  {
    path: "/success", // المسار الخاص بصفحة تأكيد الطلب
    element: <OrderSuccess />,
  },
  {
    path: "/web", // <--- إضافة المسار لصفحة المنتجات
    element: <ProductList />,
  },
  // يمكنك إضافة مسارات أخرى هنا مثل /cart و /checkout
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 4. استخدام RouterProvider لعرض التطبيق */}
    <RouterProvider router={router} /> 
  </React.StrictMode>,
)
