const Product_Promotion = require("../model/Product_Promotion");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Product_PromotionService = {
  addProduct_Promotion: async (data) => {
    const { Name, Price } = data;
    console.log("data", data);
    const checkName = await Product_Promotion.findOne({
      Name: Name,
    });
    if (checkName) {
      throw new Error(400, "Mã khuyến mãi đã tồn tại");
    }
    const newProduct = new Product_Promotion({
      Name: Name,
      Price: Price,
    });
    const savedProduct_Promotion = await newProduct.save();
    console.log(savedProduct_Promotion);
    return savedProduct_Promotion;
  },
  getProduct_PromotiondDetails: async (_id) => {
    const promotion = await Product_Promotion.findOne({ _id: _id });
    if (promotion === null) {
      throw new Error(404, "Không tìm thấy mã khuyến mãi");
    }
    return promotion;
  },
  getAllPromotion: async () => {
    const AllPromotion = await Product_Promotion.find();
    console.log("AllPromotion", AllPromotion);
    return AllPromotion;
  },
  updatePromotion: async (_id, data) => {
    const PromotionID = await Product_Promotion.findOne({ _id: _id });
    if (PromotionID === null) {
      throw new Error("Không tìm thấy mã khuyến mãi");
    }
    const updatePromotion = await Product_Promotion.findByIdAndUpdate(
      _id,
      data,
      {
        new: true,
      }
    );
    return updatePromotion;
  },
  deletepromotion: async (_id) => {
    const PromotionID = await Product_Promotion.findOne({_id:_id})
    if (PromotionID === null) {
      throw new Error("Mã khuyến mãi chưa tồn tại trong hệ thống");
    }
    await Product_Promotion.findByIdAndDelete(_id);
    if (PromotionID) {
      throw new Error("Mã khuyến mãi đã xoá thành công");
    }
  },
};
module.exports = Product_PromotionService;
