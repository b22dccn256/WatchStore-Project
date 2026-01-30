# WatchStore-Project
Bộ Môn: Phát Triển Hệ Thống Thương Mại Điện Tử
BẢN ĐỒ TỔNG QUAN DỰ ÁN WATCHSTORE (6 Phases).

Giai đoạn 1: Khởi tạo & Hiển thị (ĐÃ HOÀN THÀNH) 
[x] - Cấu trúc thư mục Monorepo (Client/Server).
[x] - Kết nối MongoDB & Seeding dữ liệu mẫu.
[x] - Backend API cơ bản (Lấy danh sách sản phẩm).
[x] - Frontend hiển thị danh sách & Chi tiết sản phẩm.
[x] - Routing (Chuyển trang).

Giai đoạn 2: Trái tim của E-commerce - "Giỏ hàng thông minh"
Công nghệ: React Context API (hoặc Redux Toolkit) + LocalStorage.
Mục tiêu:
- Thêm/Xóa/Sửa số lượng sản phẩm.
- Logic kho: Không cho thêm quá số lượng tồn kho (countInStock).
- Persist: F5 không mất giỏ hàng (Lưu LocalStorage).
- Tính tổng tiền tự động.

Giai đoạn 3: Xác thực & Phân quyền (Authentication)
Để khách đặt hàng và Admin quản lý, hệ thống cần biết "Ai là ai".
- Backend: JWT (JSON Web Token), Bcrypt (Mã hóa pass), Middleware bảo vệ Route.
- Frontend: Trang Đăng nhập/Đăng ký, Lưu Token, Tự động logout khi hết phiên.
- Phân quyền: Tách biệt User thường và Admin.

Giai đoạn 4: Đặt hàng & Thanh toán (Order & Payment)
Biến giỏ hàng thành đơn hàng thực tế.
Flow: Giỏ hàng -> Điền địa chỉ -> Chọn thanh toán -> Xác nhận.
Backend Logic:
- Tạo bản ghi Order trong DB.
- Trừ tồn kho (Quan trọng): Khi đặt hàng xong, số lượng trong kho phải giảm ngay lập tức.
- Tích hợp thanh toán giả lập (hoặc PayPal Sandbox).

Giai đoạn 5: Admin Dashboard & Quản trị
Giao diện quản lý cho chủ shop.
- Quản lý Sản phẩm (Thêm/Sửa/Xóa).
- Import Excel: Nhập hàng loạt sản phẩm từ file Excel (Yêu cầu đề bài).
- Quản lý Đơn hàng: Duyệt đơn, đánh dấu đã giao.
- Thống kê: Vẽ biểu đồ doanh thu (Chart.js) như demo HTML ban đầu.

Giai đoạn 6: Tính năng (Advanced)
- Chatbot AI: Tích hợp OpenAI/Dialogflow trả lời khách.
- Email Marketing: Gửi mail tự động khi có đơn hàng.
- Deploy: Đưa web lên Internet (Vercel/Render).
