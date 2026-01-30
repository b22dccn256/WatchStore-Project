import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        {/* Header luôn hiển thị ở mọi trang */}
        <Header />

        <main className="py-4">
          <Routes>
            {/* Định nghĩa các đường dẫn */}
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />

            {/* Các route chờ làm sau */}
            <Route path="/cart" element={<div className="text-center mt-10">Trang Giỏ Hàng (Đang xây dựng)</div>} />
            <Route path="/login" element={<div className="text-center mt-10">Trang Đăng Nhập (Đang xây dựng)</div>} />
          </Routes>
        </main>

        {/* Footer đơn giản */}
        <footer className="bg-slate-900 text-slate-400 text-center py-6 mt-10">
          <p>Copyright © 2026 WatchStore Project</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;