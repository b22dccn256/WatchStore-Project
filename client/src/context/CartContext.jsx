import { createContext, useState, useEffect } from 'react';

// 1. Tạo Context (Cái khung chứa)
export const CartContext = createContext();

// 2. Tạo Provider (Người cung cấp dữ liệu)
export const CartProvider = ({ children }) => {
    // Logic: Lấy dữ liệu từ LocalStorage ra trước (để F5 không bị mất)
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cartItems');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Logic: Mỗi khi cartItems thay đổi, tự động lưu lại vào LocalStorage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // --- HÀM 1: THÊM VÀO GIỎ ---
    const addToCart = (product, qty) => {
        const newItem = { ...product, qty };

        // Kiểm tra xem sản phẩm này đã có trong giỏ chưa?
        const existItem = cartItems.find((x) => x._id === product._id);

        if (existItem) {
            // Nếu có rồi -> Chỉ cập nhật lại số lượng (ghi đè item cũ bằng item mới)
            setCartItems(cartItems.map((x) =>
                x._id === existItem._id ? newItem : x
            ));
        } else {
            // Nếu chưa có -> Thêm mới vào mảng
            setCartItems([...cartItems, newItem]);
        }
    };

    // --- HÀM 2: XÓA KHỎI GIỎ ---
    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((x) => x._id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};