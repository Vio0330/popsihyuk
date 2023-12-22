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

const RankingSelector: React.FC<{ category : string}> = ({category}) => {
    const [selectedIsClick, setSelectedIsClick] = useState(true);

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
                </Container1>
                <RankingBox category={category} menu={selectedIsClick}/>
            </Container2>
        </div>
    )
}

export default RankingSelector;