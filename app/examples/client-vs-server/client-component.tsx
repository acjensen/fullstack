'use client';

import { useEffect, useState } from 'react';

const ClientComponent = () => {
  const [data, setData] = useState('loading...');
  useEffect(() => {
    fetch('https://httpbin.org/get')
      .then(async (res) => res.json())
      .then((_data) => {
        setData(JSON.stringify(_data, null, 2));
      });
  }, []);
  return <div>{`response: ${data}`}</div>;
};

export default ClientComponent;
