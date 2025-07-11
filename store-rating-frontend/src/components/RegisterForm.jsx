import React, { useState } from 'react';
import axios from 'axios';

function RatingForm({ storeId, onSuccess }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/api/ratings', {
        storeId,
        rating,
        comment
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Rating submitted!');
      setRating('');
      setComment('');
      if (onSuccess) onSuccess(); // optional callback to reload or refresh
    } catch (err) {
      console.error('Error submitting rating:', err);
      alert('Failed to submit rating');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={rating}
        min="1"
        max="5"
        placeholder="Rating (1-5)"
        onChange={(e) => setRating(e.target.value)}
        required
      />
      <input
        type="text"
        value={comment}
        placeholder="Comment"
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default RatingForm;
