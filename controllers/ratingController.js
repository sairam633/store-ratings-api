const db = require('../config/db');




// Submit or update a rating
const submitRating = async (req, res) => {
  const { store_id, rating } = req.body;
  const user_id = req.user.id;

  try {
    // Check if the user has already rated this store
    const [existing] = await db.query(
      'SELECT * FROM ratings WHERE user_id = ? AND store_id = ?',
      [user_id, store_id]
    );

    if (existing.length > 0) {
      // Update the existing rating
      await db.query(
        'UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?',
        [rating, user_id, store_id]
      );
      return res.status(200).json({ message: 'Rating updated successfully' });
    } else {
      // Insert new rating
      await db.query(
        'INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)',
        [user_id, store_id, rating]
      );
      return res.status(201).json({ message: 'Rating submitted successfully' });
    }
  } catch (err) {
    console.error('Error submitting rating:', err);
    res.status(500).json({ message: 'Error submitting rating' });
  }
};


const getRatingsByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const [ratings] = await db.query(
      `SELECT r.store_id, s.name AS store_name, r.rating
       FROM ratings r
       JOIN stores s ON r.store_id = s.id
       WHERE r.user_id = ?`,
      [userId]
    );

    res.json({ ratings });
  } catch (err) {
    console.error('Error fetching ratings:', err);
    res.status(500).json({ message: 'Error fetching ratings' });
  }
};

const deleteRating = async (req, res) => {
  const store_id = req.params.storeId;
  const user_id = req.user.id;

  try {
    const [result] = await db.query(
      'DELETE FROM ratings WHERE user_id = ? AND store_id = ?',
      [user_id, store_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    res.json({ message: 'Rating deleted successfully' });
  } catch (err) {
    console.error('Error deleting rating:', err);
    res.status(500).json({ message: 'Error deleting rating' });
  }
};



const getRatingsForStore = async (req, res) => {
  const { storeId } = req.params;

  try {
    const [ratings] = await db.query(
      `SELECT r.rating, r.comment, u.username
       FROM ratings r
       JOIN users u ON r.user_id = u.id
       WHERE r.store_id = ?`,
      [storeId]
    );

    res.json(ratings);
  } catch (err) {
    console.error('Error fetching ratings:', err);
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
};



module.exports = {
  submitRating,
  getRatingsByUser,
  getRatingsForStore,
  deleteRating
};


