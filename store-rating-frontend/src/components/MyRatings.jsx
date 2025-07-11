import { useEffect, useState } from 'react';
import axios from 'axios';

function MyRatings() {
  const [ratings, setRatings] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    axios.get('http://localhost:5000/api/ratings/user', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setRatings(res.data.ratings))
      .catch(err => console.error(err));
  }, [token]);

  if (!token) return <p>Please log in to view your ratings.</p>;
  if (!ratings.length) return <p>You haven't rated any stores yet.</p>;

  return (
    <div>
      <h2>My Ratings</h2>
      <ul>
        {ratings.map((r, i) => (
          <li key={i}>
            {r.store_name}: ⭐{r.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyRatings;
