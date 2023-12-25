import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { database } from './firebase'; // Firebase 설정 파일 경로를 확인하세요
import { ref, onValue } from 'firebase/database';

const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 20px;
  border: 1px solid #ddd;
  border-top: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 800px;
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

const RankingBox: React.FC<{ category: string, menu: boolean, isExpanded: boolean }> = ({ category, menu, isExpanded }) => {

  const [Coffees, setCoffees] = useState<{ [key: string]: number }>({});
  

  useEffect(() => {
    const clicksRef = ref(database, menu?'counts':'coffees');
    

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
  const displayRankings = isExpanded ? sortedCategories.slice(0, 10) : sortedCategories.slice(0, 1);
  return (
    <RankingContainer>
      {tofind && (
        <SelectedItem key={tofind[0]} >
          {tofindrank + 1}. {tofind[0]}: {tofind[1]} {menu?'counts':'coffees'}
        </SelectedItem>
      )}
      
      {displayRankings.map(([cat, clicks], index) => (
              <RankingItem key={cat} style={{ /* 애니메이션 스타일 */ }}>
                {index + 1}. {cat}: {clicks} {menu?'counts':'coffees'}
              </RankingItem>
            ))}
    </RankingContainer>
  );
};

export default RankingBox;
