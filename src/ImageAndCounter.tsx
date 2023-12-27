import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import styled from 'styled-components';
import { ref as dbref, onValue, runTransaction } from 'firebase/database';

const Catimage = styled.img<modeNumber>`
  width: ${({ mode2 }) => (mode2 === 4 ? '550px' : '30vw')};
  height: auto;
`;

interface modeNumber {
  mode2: number;
}

interface DisplayImageProps {
  category: string;
  mode1: number;
}

const ImageWithClickCounter: React.FC<DisplayImageProps> = ({ category, mode1 }) => {
  const [clickCount, setClickCount] = useState(0);
  const [count, setCount] = useState(0);
  const [isReverse, setIsReverse] = useState(true);

  useEffect(() => {
    const countRef = dbref(database, `counts/${category}`);
    const unsubscribe = onValue(countRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data ?? 0);
    });

    return () => unsubscribe();
  }, [category]);

  const handleImageClick = () => {
    const countRef = dbref(database, `counts/${category}`);
    runTransaction(countRef, (currentCount) => {
      return (currentCount || 0) + 1;
    });

    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    localStorage.setItem('clickCount', newClickCount.toString());

    setIsReverse(!isReverse);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: '20vh',
      }}
    >
      <div style={{ width: '150px', textAlign: 'right' }}>
        <h1 style={{ fontSize: '5vw', fontWeight: 'bold', color: 'white' }}>{clickCount}</h1>
      </div>

      <button onClick={handleImageClick} style={{ background: 'none', border: 'none', padding: 0 }}>
        <Catimage mode2={mode1} src={isReverse ? 'img/kpopcat_wp.webp' : 'img/santacat.webp'} alt="Uploaded" />
      </button>

      <div style={{ width: '150px', textAlign: 'left' }}>
        <h1 style={{ fontSize: '5vw', fontWeight: 'bold', color: 'white' }}>{count}</h1>
      </div>
    </div>
  );
};

export default ImageWithClickCounter;
