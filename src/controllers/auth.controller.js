const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registration Logic Controller
async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  // check if user already exists
  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({ message: "User Already Exists" });
  }
  const hashed = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashed,
  });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(201).json({
    message: "User Registered Successfully!",
    fullName: user.fullName,
    email: user.email,
  });
}

// Login Logic Controller

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({
      message: "user logged in successfully!",
      email: user.email,
      fullName: user.fullName,
    });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to Login", error: err.message });
  }
}

function logOut(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User Logged Out Successfully!",
  });
}

function me(req, res) {
  res.json(req.user);
}

module.exports = { registerUser, loginUser, logOut, me };
