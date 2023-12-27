
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { database } from './firebase'; // Firebase 설정 파일 경로를 확인하세요
import { ref, onValue } from 'firebase/database';

interface modeNumber{
  mode:number;
}
const RankingContainer = styled.div<modeNumber>`
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 1.5vw;
  border: 0.05vw solid #fff;
  border-top: none;
  background-color: white;
  width: ${({ mode }) => (mode === 4 ? '1209px' : '100vw')};
  max-height: 50vh; /* 최대 높이 설정 */
  overflow-y: auto; /* 내용이 초과할 경우 스크롤바 표시 */
  box-sizing: border-box;
  fontFamily: cute;
`;

const RightAlignedText = styled.span`
  float: right; // 텍스트를 우측으로 정렬
`;

const RankingItem = styled.div`
  padding: 10px;
  margin: 5px 0;
  border-bottom: 0.05vw solid #eee;
  background-color: white;
  &:last-child {
    border-bottom: none;
  }
`;

const SelectedItem = styled.div`
  padding: 10px;
  margin: 5px 0;
  border-bottom: 0.05vw solid #eee;
  background-color: gray;
  &:last-child {
    border-bottom: none;
  }
`;

const RankingBox: React.FC<{ mode: number,category: string, menu: boolean , isExpanded: boolean}> = ({mode, category, menu, isExpanded }) => {
  console.log(mode);
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
    <RankingContainer mode={mode}>
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
