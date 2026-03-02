import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { CartProvider } from './context/CartContext';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import ProfilePage from './pages/ProfilePage';
import UserListPage from './pages/UserListPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
          <Header />
          <main className="py-4">
            <Routes>
              <Route path="/" element={<HomePage />} />

              {/* Trang chủ có số trang (Ví dụ: /page/2) */}
              <Route path="/page/:pageNumber" element={<HomePage />} />

              {/* THÊM ROUTE TÌM KIẾM: Nó vẫn dùng HomePage để hiển thị */}
              <Route path="/search/:keyword" element={<HomePage />} />

              {/* Tìm kiếm có số trang (Ví dụ: /search/Rolex/page/2) */}
              <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />

              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/order/:id" element={<OrderDetailsPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              {/* Route dành cho Admin */}
              <Route path="/admin/users" element={<UserListPage />} />
              <Route path="/admin/products" element={<ProductListPage />} />
              <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
              <Route path="/admin/orders" element={<OrderListPage />} />
              <Route path="/admin/productlist/:pageNumber" element={<ProductListPage />} />

            </Routes>
          </main>

          {/* Footer (Giữ nguyên) */}
          <footer className="bg-slate-900 text-slate-400 text-center py-6 mt-10">
            <p>Copyright © 2026 WatchStore Project</p>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;