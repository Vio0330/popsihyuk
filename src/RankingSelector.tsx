import React, { useState } from "react";
import styled from 'styled-components';
import RankingBox from "./RankingBox";

interface modeNumber{
    mode:number;
}
const RankingButton = styled.button<modeNumber>`
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 18px;
  font-size: 30px;
  height: 6vh;
  border: 0.2vw solid #fff;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  width: ${({ mode }) => (mode === 4 ? '572px' : '30vw')};
  box-sizing: border-box;
`;

interface ColorButtonProps {
    bgColor: string;
    color: string
}

const ColorButton = styled(RankingButton)<ColorButtonProps>`
    background-color: ${(prop)=>prop.bgColor};
    color: ${(prop)=>prop.color};
    font-family: cute;
    font-size: 30px;
`;

const UpBotton = styled.button<modeNumber>`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    margin: 0px;
    height: 6vh;
    border: 0.05vw solid #000;
    border-bottom: none;
    border-radius: 10px 10px 0 0;
    width: ${({ mode }) => (mode === 4 ? '66px' : '3vw')};
    cursor: pointer;
    font-size: 30px; /* 적절한 폰트 크기로 조정 */
    text-align: center;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`

const Container1 = styled.div`
  display: flex;
  margin-bottom: 0px;
`;

const Container2 = styled.div`
    display: flex;
    flex-direction: column;
`

CSSContainerRule


const RankingSelector: React.FC<{ category : string, mode:number}> = ({category,mode}) => {
    console.log(mode);
    const [selectedIsClick, setSelectedIsClick] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false); // 랭킹 확장 상태

    // 랭킹 확장/축소 버튼 클릭 핸들러
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };
    const clickButtonColor = selectedIsClick?"#000":"#fff";
    const coffeeButtonColor = selectedIsClick?"#fff":"#000";

    return (
        <div style={{ display: 'flex', justifyContent: 'center',fontFamily:'cute',fontSize:'30px' }}>
            <Container2>
                <Container1>
                    <ColorButton mode={mode} bgColor={clickButtonColor} color={coffeeButtonColor} onClick={() => setSelectedIsClick(true)}>
                        <p>ClickRanking</p>
                    </ColorButton>
                    <ColorButton mode={mode} bgColor={coffeeButtonColor} color={clickButtonColor} onClick={() => setSelectedIsClick(false)}>
                        <p>CoffeeRanking</p>
                    </ColorButton>
                    <UpBotton mode={mode} onClick={toggleExpansion}>
                        <p>{isExpanded?'V':'^'}</p>
                    </UpBotton>
                </Container1>
                <RankingBox mode={mode} category={category} menu={selectedIsClick} isExpanded={isExpanded}/>
            </Container2>
        </div>
    )
}

export default RankingSelector;