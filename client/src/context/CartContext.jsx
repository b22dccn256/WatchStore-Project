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

    // <--- THÊM MỚI: Khởi tạo state cho địa chỉ giao hàng
    const [shippingAddress, setShippingAddress] = useState(() => {
        const storedAddress = localStorage.getItem('shippingAddress');
        return storedAddress ? JSON.parse(storedAddress) : {};
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

    // <--- THÊM MỚI: Hàm lưu địa chỉ giao hàng
    const saveShippingAddress = (data) => {
        setShippingAddress(data);
        localStorage.setItem('shippingAddress', JSON.stringify(data));
    };

    // Khởi tạo state cho phương thức thanh toán (Mặc định là PayPal)
    const [paymentMethod, setPaymentMethod] = useState(() => {
        const storedMethod = localStorage.getItem('paymentMethod');
        return storedMethod ? JSON.parse(storedMethod) : 'PayPal';
    });

    // Hàm lưu phương thức thanh toán
    const savePaymentMethod = (data) => {
        setPaymentMethod(data);
        localStorage.setItem('paymentMethod', JSON.stringify(data));
    };

    // Hàm dọn sạch giỏ hàng sau khi thanh toán thành công
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    return (
        <CartContext.Provider value={{
            cartItems, addToCart, removeFromCart,
            shippingAddress, saveShippingAddress,
            paymentMethod, savePaymentMethod,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};