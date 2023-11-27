import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import { ref, set, onValue } from 'firebase/database';

// 클릭 수를 저장하는 함수
function saveClickCount(count: number) {
    localStorage.setItem('clickCount', count.toString());
  }
  
  // 클릭 수를 불러오는 함수
  function getClickCount() {
    const count = localStorage.getItem('clickCount');
    return count ? parseInt(count) : 0;
  }
  

const ClickCounter: React.FC<{ category: string }> = ({ category }) => {
    const [clickCount, setClickCount] = useState<number>(0);
    const [count, setCount] = useState(0);

  useEffect(() => {
    const countRef = ref(database, `counts/${category}`);
    onValue(countRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setCount(data);
      } else {
        setCount(0);
      }
      const count = getClickCount();
      setClickCount(count);
    });
  }, [category]);

  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);
    const countRef = ref(database, `counts/${category}`);
    set(countRef, newCount);
    
    const newclickCount = clickCount + 1;
    setClickCount(newclickCount);
    saveClickCount(newclickCount);
  };

  return (
    <div>
      <h1>{category.toUpperCase()} Count: {count}</h1>
      <button onClick={handleClick}>Click me!</button>
      <h1>myClick Count: {clickCount}</h1>
    </div>
  );
};

export default ClickCounter;
