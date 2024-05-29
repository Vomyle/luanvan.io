const express=require("express");
const cors=require("cors");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
var bodyParser=require("body-parser");
const morgan=require("morgan");
const UserRoute= require("./src/routes/User")
const OrderRouter= require("./src/routes/OrderRouter")
const Product_PromotionRouter= require("./src/routes/Product_PromotionRouter")
dotenv.config();
//connect
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

const port = process.env.PORT || 6969;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"))
app.use("/api/user",UserRoute);
app.use("/api/product_Promotion",Product_PromotionRouter);
app.use("/api/order",OrderRouter);

