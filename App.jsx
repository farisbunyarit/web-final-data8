import { useState } from 'react'
import './App.css'
import Header from './Header'; // <--- سطر الاستيراد

function App() {
  const [count, setCount] = useState(0) 

  return (
    <>
      <Header /> {/* <--- استخدام المكون الجديد */}

      <h1>مرحباً بك في مشروع رياكت الجديد!</h1>
      <p>لقد نجحت في تشغيل React على نظام فيدورا.</p>
    </>
  )
}

export default App