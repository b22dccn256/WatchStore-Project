import { createContext, useState, useEffect } from 'react';
import { formatCurrency } from '../utils/format';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Lấy giỏ hàng từ LocalStorage khi mới vào web
    const [cartItems, setCartItems] = useState(
        localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    );

    // Hàm cập nhật LocalStorage mỗi khi cartItems thay đổi
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // --- SỬA LẠI HÀM THÊM VÀO GIỎ ---
    const addToCart = (product, qty = 1) => {
        // 1. Kiểm tra xem sản phẩm này đã có trong giỏ chưa
        const existItem = cartItems.find((x) => x._id === product._id);

        if (existItem) {
            // 2. Nếu ĐÃ CÓ -> Cộng dồn số lượng (Số cũ + Số mới)
            const newQty = existItem.qty + qty;

            // Kiểm tra tồn kho (nếu cần)
            if (newQty > product.countInStock) {
                alert('Xin lỗi, bạn đã thêm quá số lượng tồn kho!');
                return;
            }

            setCartItems(
                cartItems.map((x) =>
                    x._id === existItem._id ? { ...existItem, qty: newQty } : x
                )
            );
        } else {
            // 3. Nếu CHƯA CÓ -> Thêm mới vào
            setCartItems([...cartItems, { ...product, qty }]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((x) => x._id !== id));
    };

    // Hàm cập nhật số lượng trực tiếp (dùng trong trang Giỏ hàng)
    const updateCartQty = (id, qty) => {
        setCartItems(
            cartItems.map((x) => (x._id === id ? { ...x, qty: Number(qty) } : x))
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartQty, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};