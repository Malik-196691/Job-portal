const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/User");
const ExpressError = require("../utils/expressError");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const pool = require("../db");

module.exports = {
  generateToken: async (req, res) => {
    const { email, password } = req.body;
    const username = email;
    const user = await User.findByUsername(username);
    if (!user) {
      throw new ExpressError("User not found", 404);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ExpressError("Invalid password", 401);
    }
    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn: "1h",
    });
    res.send(token);
  },

  signup: async (req, res) => {
    const { email, password } = req.body;
    const username = email;
    const user = await User.create(username, password, "user");
    console.log(user);
    res.send("Create a user");
  },

  adminSignup: async (req, res) => {
    const user = await User.create(
      req.body.username,
      req.body.password,
      "admin",
    );
    console.log(user);
    res.send("Create a admin");
  },

  adminLogin: async (req, res) => {
    const user = await User.findByUsername(req.body.username);
    if (!user) {
      throw new ExpressError("User not found", 404);
    }
    const token = jwt.sign({ user: user.id, role: user.role }, secret, {
      expiresIn: "1h",
    });
    res.send(token);
  },

  logout: async (req, res) => {
    const user = await User.deleteById(req.params.id);
    if (!user) {
      throw new ExpressError("User not found", 404);
    }
    res.send("Logout a user");
  },

  getAnalytics: async (req, res) => {
    try {
      const totalJobs = await pool.query("SELECT COUNT(*) FROM jobs");
      const totalApplications = await pool.query(
        "SELECT COUNT(*) FROM applications",
      );

      const statusStats = await pool.query(`
      SELECT status, COUNT(*) 
      FROM applications
      GROUP BY status
    `);

      res.json({
        totalJobs: totalJobs.rows[0].count,
        totalApplications: totalApplications.rows[0].count,
        statusStats: statusStats.rows,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
