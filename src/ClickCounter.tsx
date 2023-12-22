/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import { ref, onValue, runTransaction } from 'firebase/database';

const ClickCounter: React.FC<{ category: string }> = ({ category }) => {
  const [clickCount, setClickCount] = useState<number>(0);
  const [count, setCount] = useState(0);
  // push check
  useEffect(() => {
    const countRef = ref(database, `counts/${category}`);
    
    const unsubscribe = onValue(countRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data ?? 0);
      //rongorong
    });

    return () => unsubscribe(); // 클린업 함수
  }, [category]);
  //Vio
  const handleClick = () => {
    // Firebase에서 카운트 업데이트
    const countRef = ref(database, `counts/${category}`);
    runTransaction(countRef, (currentCount) => {
      return (currentCount || 0) + 1;
    });

    // 로컬 카운트 업데이트
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    saveClickCount(newClickCount);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        height: '30vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center', // 가로 중앙 정렬
        alignItems: 'center', // 세로 중앙 정렬
        cursor: 'pointer', // 마우스 커서를 포인터로 변경
      }}
    >
      <h1 style={{ fontSize: '5rem', fontWeight: 'bold', display: 'flex', width: '100%', justifyContent: 'center' }}>
        <span style={{ margin: '0 20%', display: 'flex', justifyContent: 'center' }}>{clickCount}</span>
        <span style={{ margin: '0 20%', display: 'flex', justifyContent: 'center' }}>{count}</span>
      </h1>
    </div>
  );

};

export default ClickCounter;

// 클릭 수 저장 및 불러오기 함수 (기존의 코드 그대로 유지)
function saveClickCount(count: number) {
  localStorage.setItem('clickCount', count.toString());
}

// function getClickCount() {
//   const count = localStorage.getItem('clickCount');
//   return count ? parseInt(count) : 0;
// }
