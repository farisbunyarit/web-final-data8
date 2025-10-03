// هذا هو ملف src/Header.jsx

import React from 'react';

// تعريف المكون كدالة
function Header() {
  return (
    <header className="app-header">
      <h1>هذا هو عنواني الرئيسي من مكون منفصل</h1>
      <nav>
        <a href="#">الرئيسية</a>
        <a href="#">من نحن</a>
      </nav>
    </header>
  );
}

// تصدير المكون لجعله متاحًا للاستخدام في ملفات أخرى
export default Header;