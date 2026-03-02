// Hàm format tiền tệ VNĐ chuẩn (Ví dụ: 25.000.000 ₫)
export const formatCurrency = (amount) => {
    if (!amount) return '0 ₫'; // Xử lý trường hợp không có giá
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

// Hàm format ngày tháng chuẩn Việt Nam (dd/mm/yyyy)
export const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
};