const User = require("../model/User");
const Order = require("../model/Order");

const OrderService = {
    addOrder: async (userID, orderData) => {
        try {
          // Tìm người dùng dựa trên ID
          const user = await User.findOne(userID);
          if (!user) {
            throw new Error("User not found");
          }
          
          // Tạo đơn hàng mới với thông tin được cung cấp và ID của người dùng
          const newOrder = new Order({
            ...orderData,
            UserID: user._id,
          });
          
          // Lưu đơn hàng vào cơ sở dữ liệu
          const savedOrder = await newOrder.save();
          
          return savedOrder;
        } catch (err) {
          throw err;
        }
      }
};


module.exports = OrderService
