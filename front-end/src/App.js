import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Make an API request to the backend
    axios.get('http://localhost:5000/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div>
      <h1>Frontend and Backend Connection</h1>
      <p>{data ? data : 'Loading...'}</p>
    </div>
  );
};

export default App;