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
  width: 400px;
`;

interface ColorButtonProps {
    bgColor: string;
    color: string
}

const ColorButton = styled(RankingButton)<ColorButtonProps>`
    background-color: ${(prop)=>prop.bgColor};
    color: ${(prop)=>prop.color};
`;

const UpBotton = styled.button`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    margin: 0px;
    height: 60px;
    border: 1px solid #ddd;
    border-bottom: none;
    border-radius: 10px 10px 0 0;
    width: 68px;
    cursor: pointer;
    font-size: 30px; /* 적절한 폰트 크기로 조정 */
    text-align: center;
    align-items: center;
    justify-content: center;
`

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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Container2>
                <Container1>
                    <ColorButton bgColor={clickButtonColor} color={coffeeButtonColor} onClick={() => setSelectedIsClick(true)}>
                        <p>ClickRanking</p>
                    </ColorButton>
                    <ColorButton bgColor={coffeeButtonColor} color={clickButtonColor} onClick={() => setSelectedIsClick(false)}>
                        <p>CoffeeRanking</p>
                    </ColorButton>
                    <UpBotton onClick={toggleExpansion}>
                        <p>{isExpanded?'V':'^'}</p>
                    </UpBotton>
                </Container1>
                <RankingBox category={category} menu={selectedIsClick} isExpanded={isExpanded}/>
            </Container2>
        </div>
    )
}

export default RankingSelector;