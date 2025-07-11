import { useState } from 'react';
import axios from 'axios';

function RatingForm({ storeId }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:5000/api/ratings',
        { store_id: storeId, rating: parseInt(rating), comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRating('');
      setComment('');
      alert('Rating submitted');
    } catch (err) {
      alert('Error submitting rating');
      console.log(err)
    }
  };

  if (!token) return <p>Login to submit a rating.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input type="number" value={rating} min="1" max="5" onChange={(e) => setRating(e.target.value)} required />
      </label>
      <br />
      <label>
        Comment:
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      <br />
      <button type="submit">Submit Rating</button>
    </form>
  );
}

export default RatingForm;
