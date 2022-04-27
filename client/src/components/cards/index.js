import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Cards() {
  const [campaines, setCampaines] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { data: { campaines: campainesfromDB } } } = await axios.get('/api/campaines?search=search&available=available&category=category&page=page&limit=limit');
        setCampaines(campainesfromDB);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  });
  return (
    <div>
      {campaines.map(() => (
        <div>h</div>
      ))}
    </div>
  );
}

export default Cards;
