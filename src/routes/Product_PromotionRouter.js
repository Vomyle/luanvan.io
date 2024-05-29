const express = require('express');
const router = express.Router();
const {Product_PromotionController} = require('../controllers/Product_PromotionController');

router.post("/create",Product_PromotionController.createProduct_Promotion)
router.get("/getdetailsPromotion/:id",Product_PromotionController.getDetailsProduct_Promotion)
router.get("/getAllPromotion",Product_PromotionController.getAllProduct_Promotion)
router.put("/updateProductPromotion/:id", Product_PromotionController.updateProduct_Promotion)
router.delete("/deleteProductPromotion/:id", Product_PromotionController.deleteProduct_Promotion)
module.exports = router;