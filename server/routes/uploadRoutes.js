const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

// 1. Cấu hình nơi lưu trữ (DiskStorage)
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/'); // Lưu vào thư mục 'uploads' ở gốc dự án
    },
    filename(req, file, cb) {
        // Đặt tên file: tên-gốc + ngày-tháng + đuôi-file (để tránh trùng tên)
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

// 2. Kiểm tra định dạng file (Chỉ cho phép jpg, jpeg, png)
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Lỗi: Chỉ được upload file ảnh!');
    }
}

// 3. Khởi tạo Multer upload
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// 4. Tạo Route: POST /api/upload
// 'image' là tên key mà Frontend sẽ gửi lên
router.post('/', upload.single('image'), (req, res) => {
    // Trả về đường dẫn file đã lưu để Frontend hiển thị
    res.send(`/${req.file.path.replace(/\\/g, '/')}`); // Regex để sửa lỗi đường dẫn trên Windows
});

module.exports = router;