import { useEffect, useState } from 'react';
import axios from 'axios';

function StoreRatings({ storeId }) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/ratings/${storeId}`)
      .then(res => setRatings(res.data))
      .catch(err => console.error(err));
  }, [storeId]);

  return (
    <div>
      <h4>Ratings:</h4>
      {ratings.length === 0 ? <p>No ratings yet</p> : (
        ratings.map((r, i) => (
          <div key={i}>
            <strong>{r.user?.username || 'User'}</strong>: ⭐{r.rating}
            {r.comment && <p>{r.comment}</p>}
          </div>
        ))
      )}
    </div>
  );
}

export default StoreRatings;
