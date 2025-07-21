require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./db');
const adminRoutes = require('./routes/admin');

const app = express();
connectDB(); // Connect DB

app.use(cors());
app.use(express.json());

app.use('/admin', adminRoutes);

// Test route to verify DB fetch
app.get('/test', async (req, res) => {
  try {
    const db = getDB();
    const data = await db.collection('formResponses').find().toArray();
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('DB fetch failed');
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
