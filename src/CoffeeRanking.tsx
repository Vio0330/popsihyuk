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

const SelectedItem = styled.div`
  padding: 10px;
  margin: 5px 0;
  border-bottom: 1px solid #eee;
  background-color: gray;
  &:last-child {
    border-bottom: none;
  }
`;

const CoffeeRanking: React.FC<{ category: string }> = ({ category }) => {
  const [Coffees, setCoffees] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const clicksRef = ref(database, 'coffees'); // 데이터 경로는 실제 경로에 맞게 조정하세요

    const unsubscribe =  onValue(clicksRef, (snapshot) => {
      setCoffees(snapshot.val() || {});
    });

    return () => {
      unsubscribe()
    }; // 클린업 함수
  });

  const sortedCategories = Object.entries(Coffees).sort((a, b) => b[1] - a[1]);
  const tofind = sortedCategories.find((([key]) => key === category))
  const tofindrank = sortedCategories.findIndex((([key]) => key === category))

  return (
    <RankingContainer>
      {tofind && (
        <SelectedItem key={tofind[0]} >
          {tofindrank + 1}. {tofind[0]}: {tofind[1]} coffees
        </SelectedItem>
      )}
      {sortedCategories
        .map(([cat, clicks], index) => (
          <RankingItem key={cat}>
            {index + 1}. {cat}: {clicks} coffees
          </RankingItem>
        ))}
    </RankingContainer>
  );
};

export default CoffeeRanking;
