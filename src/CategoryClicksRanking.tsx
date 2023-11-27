import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { database } from './firebase'; // Firebase 설정 파일 경로를 확인하세요
import { ref, onValue } from 'firebase/database';

const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const RankingItem = styled.div`
  padding: 10px;
  margin: 5px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const CategoryClicksRanking: React.FC = () => {
  const [categoryClicks, setCategoryClicks] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const clicksRef = ref(database, 'counts'); // 데이터 경로는 실제 경로에 맞게 조정하세요

    const unsubscribe =  onValue(clicksRef, (snapshot) => {
      setCategoryClicks(snapshot.val() || {});
    });

    return () => {
      unsubscribe()
    }; // 클린업 함수
  }, []);

  const sortedCategories = Object.entries(categoryClicks).sort((a, b) => b[1] - a[1]);

  return (
    <RankingContainer>
      {sortedCategories.map(([category, clicks], index) => (
        <RankingItem key={category}>
          {index + 1}. {category}: {clicks} clicks
        </RankingItem>
      ))}
    </RankingContainer>
  );
};

export default CategoryClicksRanking;
