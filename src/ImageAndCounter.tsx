import React, { useState, useEffect } from 'react';
import { database, storage } from './firebase';
import { ref as dbref, onValue, runTransaction } from 'firebase/database';
import { ref as stref, getDownloadURL } from 'firebase/storage';
interface DisplayImageProps {
    imagePath: string;
    category: string;
  }

const ImageWithClickCounter : React.FC<DisplayImageProps> = ({ imagePath,category }) => {
  // State for DisplayImage
  const [imageUrl, setImageUrl] = useState('');

  // State for ClickCounter
  const [clickCount, setClickCount] = useState(0);
  const [count, setCount] = useState(0);

  // Effect for DisplayImage
  useEffect(() => {
    if (!imagePath) {
      return;
    }
    const imageRef = stref(storage, imagePath);
    const fetchImageUrl = async () => {
      try {
        const url_image = await getDownloadURL(imageRef);
        setImageUrl(url_image);
      } catch (error) {
        console.error("이미지를 불러오는 중 에러가 발생했습니다:", error);
      }
    };

    fetchImageUrl();
  }, [imagePath]);

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
      {imageUrl && (
        <button onClick={handleImageClick} style={{ background: 'none', border: 'none', padding: 0 }}>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ width: '30%', height: 'auto' }}
          />
        </button>
      )}

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
