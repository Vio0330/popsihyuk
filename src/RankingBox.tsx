import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { database } from './firebase'; // Firebase 설정 파일 경로를 확인하세요
import { ref, onValue } from 'firebase/database';

const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 1.5vw;
  border: 1px solid #ddd;
  border-top: none;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 800px;
`;
const RightAlignedText = styled.span`
  float: right; // 텍스트를 우측으로 정렬
`;
const RankingItem = styled.div`
  padding: 10px;
  margin: 5px 0;
  border-bottom: 1px solid #eee;
  background-color: white;
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

const RankingBox: React.FC<{ category: string, menu: boolean , isExpanded: boolean}> = ({ category, menu, isExpanded }) => {

  const [Coffees, setCoffees] = useState<{ [key: string]: number }>({});
  const [maxItemsToShow, setMaxItemsToShow] = useState(1); // 표시할 최대 아이템 수

  

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

  useEffect(() => {
    let interval: NodeJS.Timeout | number; ;

    if (isExpanded) {
      interval = setInterval(() => {
        setMaxItemsToShow(prevMax => {
          const nextMax = prevMax + 1;
          if (nextMax > sortedCategories.length) {
            clearInterval(interval); // 모든 아이템이 표시된 경우 인터벌 중단
            return sortedCategories.length;
          }
          return nextMax;
        });
      }, 20); // 100ms 간격으로 아이템을 하나씩 추가
    } else {
      interval = setInterval(() => {
        setMaxItemsToShow(prevMax => {
          const nextMax = prevMax - 1;
          if (nextMax <= 0) {
            clearInterval(interval as NodeJS.Timeout);
            return 0;
          }
          return nextMax;
        });
      }, 20); // 아이템을 빠르게 하나씩 줄임
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isExpanded, sortedCategories.length]);



  return (
    <RankingContainer>
      {tofind && (
        <SelectedItem key={tofind[0]} >
          {tofindrank + 1}. {tofind[0]}
          <RightAlignedText>
          {tofind[1]} {menu ? 'counts' : 'coffees'}
          </RightAlignedText>
        </SelectedItem>
      )}
      
      {sortedCategories.slice(0, maxItemsToShow).map(([cat, clicks], index) => (
                <RankingItem key={cat}>
                    {index + 1}. {cat}<RightAlignedText>
                    {clicks} {menu ? 'counts' : 'coffees'}
                    </RightAlignedText>
                </RankingItem>
            ))}
    </RankingContainer>
  );
};

export default RankingBox;
