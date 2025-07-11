import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RatingForm from './RatingForm';
import StoreRatings from './StoreRatings';

function StoreList() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/stores')
      .then(res => {
        setStores(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stores:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading stores...</p>;

  return (
    <div>
      <h2>All Stores</h2>
      {stores.map(store => (
        <div key={store.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h3>{store.name}</h3>
          <p>{store.description}</p>
          <StoreRatings storeId={store.id} />
          <RatingForm storeId={store.id} />
        </div>
      ))}
    </div>
  );
}

export default StoreList;
  