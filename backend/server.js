const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const connectDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

/* Schema + Model */
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { 
      type: String,
      // required: true,
      // select: false 
    },
    contact: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

// ==========================
// SIGNUP API
// ==========================
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      contact
    });

    res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, name: user.name, email: user.email, contact: user.contact || null }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const jwt = require("jsonwebtoken");
// ==========================
// LOGIN API
// ==========================
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // ✅ Include password explicitly
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, contact: user.contact || null },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});





/* CREATE */
app.post("/users", async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = await User.create({ name, email, contact });
    res.status(201).json({
      message: "User created successfully",
      user
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* READ */
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/* UPDATE */
app.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(user);
});

/* DELETE */
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

app.listen(4000, () => {
  console.log("Server running on 4000");
});
