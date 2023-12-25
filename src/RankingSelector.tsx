import React, { useState } from "react";
import styled from 'styled-components';
import RankingBox from "./RankingBox";

const RankingButton = styled.button`
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 20px;
  height: 60px;
  border: 1px solid #ddd;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  font-family: cute;
  width: 421px;
`;

interface ColorButtonProps {
    bgColor: string;
    color: string
}

const ColorButton = styled(RankingButton)<ColorButtonProps>`
    background-color: ${(prop)=>prop.bgColor};
    color: ${(prop)=>prop.color};
`;

const Container1 = styled.div`
  display: flex;
  margin-top: 200px;
  margin-bottom: 0px;
`;

const Container2 = styled.div`
    display: flex;
    flex-direction: column;
`

CSSContainerRule
const ExpandButton = styled.button`
padding: 10px 20px; /* 버튼 내부 여백 */
background-color: #007bff; /* 배경색 */
color: white; /* 글자색 */
border: none; /* 테두리 제거 */
border-radius: 5px; /* 둥근 모서리 */
cursor: pointer; /* 마우스 오버시 커서 변경 */
font-size: 16px; /* 글자 크기 */
transition: background-color 0.3s; /* 배경색 변경시 애니메이션 */
`;

const RankingSelector: React.FC<{ category : string}> = ({category}) => {
    const [selectedIsClick, setSelectedIsClick] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false); // 랭킹 확장 상태

    // 랭킹 확장/축소 버튼 클릭 핸들러
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };
    const clickButtonColor = selectedIsClick?"#000":"#fff";
    const coffeeButtonColor = selectedIsClick?"#fff":"#000";

    return (
        <div style={{ display: 'flex', justifyContent: 'center', fontFamily:"cute"  }}>
            <Container2>
                <Container1>
                    <ColorButton bgColor={clickButtonColor} color={coffeeButtonColor} onClick={() => setSelectedIsClick(true)}>
                        <p>ClickRanking</p>
                    </ColorButton>
                    <ColorButton bgColor={coffeeButtonColor} color={clickButtonColor} onClick={() => setSelectedIsClick(false)}>
                        <p>CoffeeRanking</p>
                    </ColorButton>
                </Container1>
                <RankingBox category={category} menu={selectedIsClick} isExpanded={isExpanded}/>
                <ExpandButton onClick={toggleExpansion}>
                    {isExpanded ? 'Show Less' : 'Show More'}
                </ExpandButton>
            </Container2>
        </div>
    )
}

export default RankingSelector;