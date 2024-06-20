const { Router } = require("express");
const router = Router();
const User = require("../db");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// registration schema for zod validation
const registrationSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Valid email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .refine((value) => !/\s/.test(value), {
      message: "Password cannot contain spaces",
    }),
});

// login schema for zod validation
const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "password is required"),
});

//middleware for validation
const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (e) {
    res.status(400).json({
      errors: e.errors.map((e) => ({ msg: e.message, path: e.path })),
    });
  }
};

//register route

router.post("/register", validate(registrationSchema), async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    //Creating the new user in the users table
    user = new User({
      username,
      email,
      password,
    });
    await user.save();
    //retrieving the id from the users table and signing the user id with jwt and putting it in the cookie
    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({
      msg: "User has successfully registered",
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/signin", validate(loginSchema), async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User doesnt exist",
      });
    }
    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame) {
      return res.status(400).json({
        msg: "Invalid credentials",
      });
    }

    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true, secure: false });
    res.json({ msg: "Logged in successfully" });
  } catch (e) {
    res.status(500).json({ msg: "Server error" });
  }
});

//protectd routes

router.get("/protected", (req, res) => {
  const token = req.cookies.token; // Extracting the token correctly
  if (!token) {
    return res
      .status(401)
      .json({ msg: "You did not get the token! Please sign in first." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    res.json({ msg: `This is the protected page, user: ${req.user.id}` });
  } catch (e) {
    res.status(401).json({ msg: "Not a valid token" });
  }
});

module.exports = router;
