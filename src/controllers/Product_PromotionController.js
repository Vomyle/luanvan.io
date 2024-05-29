const Product_PromotionService = require("../services/Product_PromotionService");

const Product_PromotionController = {
  createProduct_Promotion: async (req, res) => {
    try {
      const { Price, Name } = req.body;
      if (!Name || !Price) {
        return res.status(400).json({
          status: "ERROR",
          message: "All fields are required",
        });
      }
      console.log("req.body", req.body);
      console.log(typeof Product_PromotionService.addProduct_Promotion);
      const result = await Product_PromotionService.addProduct_Promotion(
        req.body
      );
      console.log("result", result);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "ERROR",
        message: "Internal Server Error",
      });
    }
  },
  getDetailsProduct_Promotion: async (req, res) => {
    const Product_PromotionId = req.params.id;
    try {
      if (!Product_PromotionId) {
        return res.status(400).json({
          status: "ERROR",
          message: "ma khuyen mai chưa tồn tại trong hệ thống.",
        });
      }
      const result =
        await Product_PromotionService.getProduct_PromotiondDetails(
          Product_PromotionId
        );
      res.status(200).json(result);
    } catch (err) {
      if (err.message === "Không tìm thấy mã khuyến mãi") {
        return res.status(400).json({
          status: "ERROR",
          message: err.message,
        });
      }
      res.status(500).json({
        status: "ERROR",
        message: "Internal Server Error",
      });
    }
  },
  getAllProduct_Promotion: async (req, res) => {
    try {
      const result = await Product_PromotionService.getAllPromotion();
      console.log("result", result);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json("ERROR");
    }
  },
  updateProduct_Promotion: async (req, res) => {
    const PromotionID = req.params.id;
    const data = req.body;
    try {
      if (!PromotionID) {
        return res.status(400).json({ message: "Mã khuyến mãi không tồn tại" });
      }

      const result = await Product_PromotionService.updatePromotion(
        PromotionID,
        data
      );
      res.status(200).json(result);
    } catch (err) {
      if (err.message === "Không tìm thấy mã khuyến mãi") {
        return res.status(400).json({
          message: err.message,
        });
      }
      res.status(500).json({
        status: "ERROR",
        message: "Internal Server Error",
      });
    }
  },
  deleteProduct_Promotion: async (req, res) => {
    const PromotionID = req.params.id;
    try {
      if (!PromotionID) {
        return res.status(400).json({ message: "Mã khuyến mãi không tồn tại" });
      }
      const result = await Product_PromotionService.deletepromotion(
        PromotionID
      );
      res.status(200).json(result);
    } catch (error) {
      if (error.message === "Mã khuyến mãi chưa tồn tại trong hệ thống") {
        return res.status(400).json({
          message: error.message,
        });
      } else if (error.message === "Mã khuyến mãi đã xoá thành công") {
        return res.status(400).json({
          message: error.message,
        });
      }
      res.status(500).json({
        status: "ERROR",
        message: "Internal Server Error",
      });
    }
  },
};
module.exports = {
  Product_PromotionController,
};
