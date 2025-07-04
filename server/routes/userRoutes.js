const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware');
const nodemailer = require('nodemailer')
const crypto = require('crypto');
const GoogleUsers = require('../models/GoogleUsers');
const Order = require('../models/Order');

const otpStore = new Map();

// GET all users (protected)
router.get('/Users', authenticateToken, async (req, res) => {
 const Orders = await User.find({email: req.user.email});
     return res.status(201).json(Orders)
 } )

router.get('/google-login', async (req, res) => {
  try {
    const users = await GoogleUsers.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// POST new user (signup)
router.post('/Users', async (req, res) => {
  const { name, email, password, address } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if(password < 4){
return res.status(408).json({message: 'Password must be alteast 4 characters'})
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password || '', 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'User created successfully', token: token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user', error });
  }
});

// POST login
router.post('/login', async (req, res) => {
  try {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

router.post('/google-login', async (req, res) => {
  const { name, email, googleUser } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: 'Email and name are required' });
  }
  try {
    let user = await GoogleUsers.findOne({ email });

    if (!user) {
      // Create new Google user
      const newUser = new GoogleUsers({
        name,
        email,
        googleUser
      });
     const user = newUser.save();
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(201).json({ message: 'Google user created', token, user });
    }


    if (!googleUser) {
      return res.status(403).json({ message: 'Use standard login for this account' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ message: 'Google login successful', token, user });

  } catch (error) {
    console.error('Google login error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (otpStore.has(email)) {
  const existing = otpStore.get(email);
  if (Date.now() < existing.expiresAt - 3 * 60 * 1000) {
    return res.status(429).json({ message: 'OTP already sent. Please wait.' });
  }
}

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore.set(email, { otp, expiresAt });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'OTP for Password Reset',
      text: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`
    });

    res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  const data = otpStore.get(email);
  if (!data || data.otp !== otp || Date.now() > data.expiresAt) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  otpStore.set(email, { ...data, verified: true });

  res.json({ message: 'OTP verified' });
});

router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body; 

   if (!email) {
    return res.status(400).json({ message: 'Email not received, Please verify your Email First'});
  }
  
  const result = otpStore.get(email);
  if (!result || !result.verified) {
    return res.status(400).json({ message: `OTP not verified`});
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashed });

  otpStore.delete(email);
  res.json({ message: 'Password reset successfully' });
});


module.exports = router;