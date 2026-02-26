import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <Header />
        <main className="py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />

            {/* 2. Cập nhật dòng này */}
            <Route path="/cart" element={<CartPage />} />

            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>

        {/* Footer (Giữ nguyên) */}
        <footer className="bg-slate-900 text-slate-400 text-center py-6 mt-10">
          <p>Copyright © 2026 WatchStore Project</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;