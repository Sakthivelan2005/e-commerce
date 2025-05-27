require('dotenv').config(); // Load .env variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ Connection failed', err));

// Routes
app.use('/', userRoutes);
app.use('/', orderRoutes);

app.get('/', (req, res) => {
  res.send('Server is Running...');
});

app.get('/login', (req, res) => {
  res.send('Login endpoint is POST only');
});

app.get('/*', (req, res) => {
  res.status(404).send(`404 Error: Route ${req.originalUrl} not found`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on https://e-commerce-qa5o.onrender.com/${PORT}`));
