// adminController.js
const Admin = require('../models/AdminModel');

// Hàm đăng ký admin
const registerAdmin = async (email, name, password) => {
    try {
        // Kiểm tra xem email đã tồn tại trong bảng Admin hay không
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return { error: 'Email đã tồn tại trong Admin' };
        }
        // Tạo admin mới
        const newAdmin = await Admin.create({
            email,
            name,
            password,
        });

        return { admin: newAdmin };
    } catch (err) {
        return { error: err.message };
    }
};


const loginAdmin = async (email, password) => {
    try {
        
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return { error: 'Admin không tồn tại' };
        }

        if (admin.password !== password) {
            return { error: 'Mật khẩu không đúng' };
        }

        return { message: 'Đăng nhập thành công' };
    } catch (err) {
        return { error: err.message };
    }
};

module.exports = { registerAdmin, loginAdmin };
