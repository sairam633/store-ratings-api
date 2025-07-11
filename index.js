const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Test Route
app.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1');
    res.send('Backend running! DB connected.');
  } catch (err) {
    res.status(500).send('Database connection failed.');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const authenticateToken = require('./middleware/authMiddleware');

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


const storeRoutes = require('./routes/storeRoutes');
app.use('/api/stores', storeRoutes);

const ratingRoutes = require('./routes/ratingRoutes');
app.use('/api/ratings', ratingRoutes);


