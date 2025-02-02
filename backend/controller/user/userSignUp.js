const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");

async function userSignUpcontroller(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      throw new Error("User Already Exits.");
    }

    if (!name) {
      throw new Error("Please provide name");
    }
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something Went Wrong");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();
    if (!saveUser) {
      throw new Error("Something Went Wrong");
    }
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Created Successfully!",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpcontroller;
