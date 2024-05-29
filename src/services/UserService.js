const bcrypt = require("bcrypt");
const User = require("../../src/model/User");
const {
  genneralAccessToken,
  genneralRefreshAccessToken,
} = require("./JwtService");

const UserService = {
  createUser: async (data) => {
    const { Name, Email, Password } = data;
    // Kiểm tra xem người dùng đã tồn tại với email đã cho chưa
    const checkUser = await User.findOne({ Email: Email });
    if (checkUser !== null) {
      throw new Error("Email đã tồn tại trong hệ thống."); // Ném ra một lỗi nếu email đã tồn tại
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(Password, 10); // 10 là số lượt vòng lặp mã hóa

    // Tạo một người dùng mới với mật khẩu đã được mã hóa
    const newUser = new User({
      Name: Name,
      Email: Email,
      Password: hashedPassword, // Mật khẩu đã được mã hóa
    });

    const savedUser = await newUser.save();
    return savedUser;
  },
  loginUser: async (data) => {
    const { Email, Password } = data;

    // Kiểm tra xem người dùng đã tồn tại với email đã cho chưa
    const checkUser = await User.findOne({ Email: Email });
    if (checkUser === null) {
      throw new Error("Email chưa tồn tại trong hệ thống."); // Ném ra một lỗi nếu email không tồn tại
    }

    // So sánh mật khẩu đã được mã hóa với mật khẩu người dùng nhập vào
    const isPasswordValid = await bcrypt.compareSync(Password, checkUser.Password);
    console.log("Password", Password);
    console.log("checkUser.Password", checkUser.Password);
    const access_token = await genneralAccessToken({
      id: checkUser._id,
      IsAdmin: checkUser.IsAdmin,
    });

    const refresh_token = await genneralRefreshAccessToken({
      id: checkUser._id,
      IsAdmin: checkUser.IsAdmin,
    });
    console.log("access_token", access_token);
    if (!isPasswordValid) {
      throw new Error("Mật khẩu không chính xác."); // Ném ra một lỗi nếu mật khẩu không đúng
    }
    // Nếu mọi thứ đều hợp lệ, trả về thông tin người dùng
    return { access_token, refresh_token };
  },
  updateUser: async (_id, data) => {
    const checkUser = await User.findOne({
      _id: _id,
    });

    if (checkUser === null) {
      throw new Error("User chưa tồn tại trong hệ thống."); // Ném ra một lỗi nếu email không tồn tại
    }
    const updateUser = await User.findByIdAndUpdate(_id, data, { new: true });
    return updateUser;
  },
  deleteUser: async (_id) => {
    const checkUser = await User.findOne({
      _id: _id,
    });

    if (checkUser === null) {
      throw new Error("User chưa tồn tại trong hệ thống."); // Ném ra một lỗi nếu email không tồn tại
    }
    await User.findByIdAndDelete(_id);
    if (checkUser) {
      // Người dùng tồn tại, xử lý logic tại đây
      return { status: 'OK', message: "Delete User success" };
    }
    

  },
  getAllUser: async () => {
    const getAll=await User.find();
  return getAll
  },
  getDetailsUser: async (_id) => {
    const user = await User.findOne({
      _id: _id,
    });

    if (user === null) {
      throw new Error("User chưa tồn tại trong hệ thống."); // Ném ra một lỗi nếu email không tồn tại
    }
 
  return user;

  },
}

module.exports = UserService;
