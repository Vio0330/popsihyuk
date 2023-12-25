import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import { ref as dbref, onValue, runTransaction } from 'firebase/database';
interface DisplayImageProps {
    category: string;
  }

const ImageWithClickCounter : React.FC<DisplayImageProps> = ({ category }) => {

  // State for ClickCounter
  const [clickCount, setClickCount] = useState(0);
  const [count, setCount] = useState(0);

  

  // Effect for ClickCounter
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
  };


  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      minHeight: '20vh'
    }}>

      {/* Click Count Display with responsive font size */}
      <div style={{ width: '150px', textAlign: 'right' }}>
        <h1 style={{ fontSize: '5vw', fontWeight: 'bold' }}>
          {clickCount}
        </h1>
      </div>

      {/* Image Button sdsd*/}
      {
        <button onClick={handleImageClick} style={{ background: 'none', border: 'none', padding: 0 }}>
          <img
            src="img/kpopcat_wp.webp"
            alt="Uploaded"
            style={{ width: '70%', height: 'auto' }}
          />
        </button>
      }

      {/* Count Display with responsive font size */}
      <div style={{ width: '150px', textAlign: 'left' }}>
        <h1 style={{ fontSize: '5vw', fontWeight: 'bold' }}>
          {count}
        </h1>
        
      </div>

    </div>
  );
  
  
  
  
};

export default ImageWithClickCounter;
