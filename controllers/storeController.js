const db = require('../config/db');

// Add a store (Admin only)
const addStore = async (req, res) => {
  const { name, email, address } = req.body;

  try {
    // Check for duplicate email
    const [existing] = await db.query('SELECT * FROM stores WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Store email already exists' });
    }

    await db.query(
      'INSERT INTO stores (name, email, address) VALUES (?, ?, ?)',
      [name, email, address]
    );

    res.status(201).json({ message: 'Store added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding store' });
  }
};

// Get all stores
// storeController.js

const getAllStores = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.*, AVG(r.rating) as avg_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




const getStores = async (req, res) => {
  try {
    const [stores] = await db.query(`
      SELECT s.id, s.name, s.email, s.address,
             ROUND(AVG(r.rating), 1) AS average_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
    `);

    res.json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching stores' });
  }
};




module.exports = { addStore, getAllStores, getStores };
