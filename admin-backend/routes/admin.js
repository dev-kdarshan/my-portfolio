const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const auth = require('../middleware/auth');
const { getDB } = require('../db'); 
const jwt = require('jsonwebtoken');

const loginEmail = process.env.LOGIN_EMAIL;
const loginPass = process.env.LOGIN_PASS; 
const JWT_SECRET = process.env.JWT_SECRET || 'darshan-secret';


function verifyToken(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!token) return res.status(401).send('No token provided');
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).send('Invalid token');
  }
}
//login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === loginEmail && password === loginPass) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Get all responses
router.get('/responses',  verifyToken,auth, async (req, res) => {
  try {
    const db = getDB();
    const responses = await db.collection('formResponses').find().sort({ createdAt: -1 }).toArray();
    const mapped = responses.map(res => ({
      _id: res._id,
      name: res.name,
      detail: res.detail,
      email: res.email,
      createdAt: res.createdAt,
    }));
    res.json(mapped);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// Delete response
router.delete('/responses/:id', auth, async (req, res) => {
  try {
    const db = getDB();
    const { ObjectId } = require('mongodb');
    await db.collection('formResponses').deleteOne({ _id: new ObjectId(req.params.id) });
    res.send('Deleted');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// Reply to response
router.post('/reply', auth, async (req, res) => {
  const { to, subject, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to,
      subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.send('Email sent');
  } catch (err) {
    console.log(err);
    res.status(500).send('Email failed');
  }
});

module.exports = router;
