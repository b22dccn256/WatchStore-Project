/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true, // Tự động margin: 0 auto
            padding: '1rem', // Luôn có khoảng cách lề nhỏ
            screens: {
                lg: "1280px", // Giới hạn chiều rộng tối đa trên màn hình lớn
                xl: "1400px",
            }
        },
        extend: {
            colors: {
                primary: '#0f172a', // Xanh Navy đậm (Nền Header/Banner)
                accent: '#d4af37',  // Vàng Gold (Nút bấm/Giá tiền)
                secondary: '#f8f9fa', // Màu nền xám nhạt (Background web)
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Font nội dung
                serif: ['Playfair Display', 'serif'], // Font tiêu đề (Sang trọng)
            },
            boxShadow: {
                'card': '0 10px 30px -10px rgba(0, 0, 0, 0.1)', // Đổ bóng nhẹ cho Card
                'card-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.2)', // Đổ bóng đậm khi Hover
            }
        },
    },
    plugins: [],
}