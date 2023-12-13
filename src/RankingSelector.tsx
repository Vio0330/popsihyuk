import React, { useState } from "react";
import styled from 'styled-components';
import CategoryClicksRanking from "./CategoryClicksRanking";
import CoffeeRanking from "./CoffeeRanking";

const ClickRankingButton = styled.button`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const CoffeeRankingButton = styled.button`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const RankingSelector: React.FC<{ category : string}> = ({category}) => {
    const [selectedIsClick, setSelectedIsClick] = useState(true);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ClickRankingButton onClick={() => setSelectedIsClick(true)}>
                <p>ClickRanking</p>
            </ClickRankingButton>
            <CoffeeRankingButton onClick={() => setSelectedIsClick(false)}>
                <p>CoffeeRanking</p>
            </CoffeeRankingButton>
            {selectedIsClick? <CategoryClicksRanking category={category}/>
            :<CoffeeRanking category={category}/>}
        </div>
    )
}

export default RankingSelector;