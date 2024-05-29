const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");
const UserController = {
  addUser: async (req, res) => {
    try {
      const { Name, Email, Password } = req.body;
      const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const isCheckEmail = reg.test(Email);
      if (!Name || !Email || !Password) {
        return res.status(400).json({
          status: "ERROR",
          message: "All fields are required",
        });
      } else if (!isCheckEmail) {
        return res.status(400).json({
          status: "ERROR",
          message: "Invalid email format",
        });
      }
      const result = await UserService.createUser(req.body);
      res.status(200).json(result);
    } catch (err) {
      if (err.message === "Email đã tồn tại trong hệ thống.") {
        return res.status(400).json({
          status: "ERROR",
          message: err.message,
        });
      } else if (err.message === "Mật khẩu không chính xác.") {
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
  loginUser: async (req, res) => {
    try {
      const { Name, Email, Password } = req.body;
      const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const isCheckEmail = reg.test(Email);
      if (!Name || !Email || !Password) {
        return res.status(400).json({
          status: "ERROR",
          message: "All fields are required",
        });
      } else if (!isCheckEmail) {
        return res.status(400).json({
          status: "ERROR",
          message: "Invalid email format",
        });
      }
      const result = await UserService.loginUser(req.body);
      
      res.status(200).json(result);
    } catch (err) {
      if (err.message === "Email chưa tồn tại trong hệ thống.") {
        return res.status(400).json({
          status: "ERROR",
          message: err.message,
        });
      } else if (err.message === "Mật khẩu không chính xác.") {
        return res.status(400).json({
          status: "ERROR",
          message: err.message,
        });
      }
      res.status(500).json({
        status: "ERROR",
        message: "Internal  Server Error",
      });
    }
  },
  updateUser: async (req, res) => {
    const userId = req.params.id;
    const data = req.body;
    console.log("userId", userId);
    try {
      if (!userId || typeof userId !== "string" || userId.trim() === "") {
        return res.status(400).json({
          status: "ERROR",
          message: "User chưa tồn tại trong hệ thống.",
        });
      }
      const result = await UserService.updateUser(userId, data);
      res.status(200).json(result);
    } catch (err) {
      if (err.message === "User chưa tồn tại trong hệ thống.") {
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
  deleteUser: async (req, res) => {
    const userId = req.params.id;

    try {
      if (!userId) {
        return res.status(400).json({
          status: "ERROR",
          message: "User chưa tồn tại trong hệ thống.",
        });
      }
      const result = await UserService.deleteUser(userId);
      res.status(200).json(result);
    } catch (err) {
      if (err.message === "User chưa tồn tại trong hệ thống.") {
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
  getAllUser: async (req, res) => {
    try {
      const result = await UserService.getAllUser();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({
        status: "ERROR",
        message: "Internal Server Error",
      });
    }
  },
  getDetailsUser: async (req, res) => {
    const userId = req.params.id;
    try {
      if (!userId) {
        return res.status(400).json({
          status: "ERROR",
          message: "User chưa tồn tại trong hệ thống.",
        });
      }
      const result = await UserService.getDetailsUser(userId);
      res.status(200).json(result);
    } catch (err) {
      if (err.message === "User chưa tồn tại trong hệ thống.") {
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
  refreshToken: async (req, res) => {
    const token = req.headers.token.split(" ")[1]
    try {
      if (!token) {
        return res.status(200).json({
          status: "ERROR",
          message: "Token is require",
        });
      }
      const result = await JwtService.refreshTokenJwtService(token)
      res.status(200).json(result);
    } catch (err) {
      if (err.message === "Token is require") {
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
};

module.exports = UserController;


