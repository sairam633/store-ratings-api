
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StoreCard from '../components/StoreCard';

function Home() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/stores')
      .then(res => setStores(res.data))
      .catch(err => console.error('Failed to fetch stores:', err));
  }, []);

  return (
    <div>
      {stores.map(store => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
}

export default Home;
