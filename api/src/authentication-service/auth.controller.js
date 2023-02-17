const asyncHandler = require("express-async-handler");
const User = require("./auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Register a new user
// @route   POST /user/register
// @access  Public
const Register = asyncHandler(async (req, res) => {
  const { nom, prenom, email, password, role } = req.body;
  if (nom === "" || prenom === "" || email === "" || password === "") {
    res.status(400);
    throw new Error("Veuillez remplir tous les champs");
  }
  //check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Cet utilisateur existe deja");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //create user
  const user = await User.create({
    nom,
    prenom,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user & get token
// @route   POST /api/user/login
// @access  Public
const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check for user email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({
      message: "User does not exist",
      status: "ERROR",
    });
  }

  //check for password match
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(400).json({
      message: "Invalid credentials",
      status: "ERROR",
    });
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: "You have successfully logged in",
      status: "SUCCESS",
    });
  } else {
    res.status(401).json({
      message: "Invalid credentials",
      status: "ERROR",
    });
  }
});

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
module.exports = { Register, Login };
