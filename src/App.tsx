import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import LoadingScreen from "./components/loading-screen";
import CategorySelector from './CategorySelector';
import DisplayImage from "./DisplayImage";
import FloatingImageButton from "./FloatingImageButton";
import ImageWithClickCounter from "./ImageAndCounter";
import RankingSelector from "./RankingSelector";
import "./fonts/fonts.css"

const GlobalStyles = createGlobalStyle`
  ${reset};
  body {
    background-color: black;
  }
  fontFamily:cute;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('BTS');
  const [windowMode, setWindowMode] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      // 현재 창의 너비 확인
      const windowWidth = window.innerWidth;

      // 너비에 따라 모드 변경
      if (windowWidth <= 1210) {
        setWindowMode(3);
      } else {
        setWindowMode(4);
      }
    };

    // 컴포넌트가 마운트될 때와 창 크기가 변경될 때 이벤트 핸들러 등록
    handleResize();
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);







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
        <div style={{ position: "relative", height: "100vh", fontFamily:"cute" }}> 
        <DisplayImage mode={windowMode}/>
        <CategorySelector onSelectCategory={setSelectedCategory} />
        <ImageWithClickCounter category={selectedCategory} mode1={windowMode} />
        
        <div style={{ 
            position: "absolute",
            bottom: "0", // 화면의 맨 밑에 위치
            width: "100%", // 전체 너비 사용
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
          
          <RankingSelector mode={windowMode} category={selectedCategory} />
        </div>
        
        <FloatingImageButton />
      </div>
      )}
    </>
  );
}

export default App;