const OrderService = require("../services/OrderService");

const OrderController = {
  createOrder: async (req, res) => {
    try {
      const { Total, Email, Phone, Address, Fullname, StatusPayment, Status } =req.body;
      // Lấy ID của người dùng từ req.user
      const userID = req.user._id;
      console.log("userID",userID)
      // Gọi hàm tạo mới đơn hàng từ service và trả về kết quả
      const result = await OrderService.addOrder(userID, {
        Total,
        Email,
        Phone,
        Address,
        Fullname,
        StatusPayment,
        Status,
      });

      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "ERROR",
        message: "Internal Server Error",
      });
    }
  },
};

module.exports = OrderController;
