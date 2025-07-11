import React from 'react';

function StoreCard({ store }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10 }}>
      <h2>{store.name}</h2>
      <p>{store.description}</p>
      <p>Average Rating: {store.avg_rating || 'Not rated yet'}</p>
    </div>
  );
}



export default StoreCard;
