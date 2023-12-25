import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import LoadingScreen from "./components/loading-screen";
import CategorySelector from './CategorySelector';
import DisplayImage from "./DisplayImage";
import FloatingImageButton from "./FloatingImageButton";
import ImageWithClickCounter from "./ImageAndCounter";
import RankingSelector from "./RankingSelector";




const GlobalStyles = createGlobalStyle`
  ${reset};
  // 나머지 스타일
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('BTS');
  const init = async () => {
    setTimeout(() => setIsLoading(false), 100);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <GlobalStyles />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div style={{ position: "relative", height: "100vh" }}> 
        <CategorySelector onSelectCategory={setSelectedCategory} />
        <ImageWithClickCounter category={selectedCategory} />
        
        <div style={{ 
            position: "absolute",
            bottom: "0", // 화면의 맨 밑에 위치
            width: "100%", // 전체 너비 사용
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
          
          <RankingSelector category={selectedCategory} />
        </div>
        
        <FloatingImageButton />
      </div>
      )}
    </>
  );
}

export default App;