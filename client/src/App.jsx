import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import BottomTabBar from './components/common/BottomTabBar'
import Navbar from './components/common/Navbar'
import BookingConfirm from './pages/BookingConfirm'
import Home from './pages/Home'
import Login from './pages/Login'
import More from './pages/More'
import ServiceCategory from './pages/ServiceCategory'
import AdminApp from './pages/AdminApp'
import './App.css'

function AppLayout() {
  const location = useLocation()
  const isLogin = location.pathname === '/'
  const isHome = location.pathname === '/home'

  return (
    <div className="app-shell">
      {isHome && <Navbar />}
      <main className={isLogin ? 'login-main' : 'page-main'}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services/:category" element={<ServiceCategory />} />
          <Route path="/booking-confirm/:serviceId" element={<BookingConfirm />} />
          <Route path="/more" element={<More />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isLogin && <BottomTabBar />}
    </div>
  )
}

function AppEntry() {
  const location = useLocation()
  return location.pathname.startsWith('/admin') ? <AdminApp /> : <AuthProvider><AppLayout /></AuthProvider>
}

export default function App() {
  return <BrowserRouter><AppEntry /></BrowserRouter>
}
