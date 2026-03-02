import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import UserListPage from './pages/UserListPage'; // Nếu có
import ProfilePage from './pages/ProfilePage';
import OrderListPage from './pages/OrderListPage'; // Import trang quản lý đơn hàng

// Import các trang khác của bạn...

function App() {
  return (
    // 👇 Wrapper ngoài cùng phải là flex column và full màn hình
    <div className="flex flex-col min-h-screen bg-secondary font-sans text-gray-900">

      {/* 1. HEADER: Nằm ngoài container để tràn viền */}
      <Header />

      {/* 2. MAIN CONTENT: Phần này mới chứa nội dung thay đổi */}
      <main className="flex-grow w-full">
        {/* Lưu ý: Không dùng class 'container' ở đây để cho phép Banner tràn viền */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:keyword" element={<HomePage />} />
          <Route path="/page/:pageNumber" element={<HomePage />} />
          <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />

          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />


          <Route path="/profile" element={<ProfilePage />} />
          {/* Private Routes */}
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} />
          <Route path="/order/:id" element={<OrderDetailsPage />} />

          {/* Admin Routes */}
          <Route path="/admin/products" element={<ProductListPage />} />
          <Route path="/admin/productlist/:pageNumber" element={<ProductListPage />} />
          <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
          <Route path="/admin/users" element={<UserListPage />} />
          <Route path="/admin/orders" element={<OrderListPage />} />
        </Routes>
      </main>

      {/* 3. FOOTER */}
      <Footer />
    </div>
  );
}

export default App;