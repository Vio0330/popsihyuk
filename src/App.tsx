import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import LoadingScreen from "./components/loading-screen";
import CategorySelector from './CategorySelector';
import DisplayImage from "./DisplayImage";
import FloatingImageButton from "./FloatingImageButton";
import ImageWithClickCounter from "./ImageAndCounter";
import RankingSelector from "./RankingSelector";
import { isMobile } from "react-device-detect";
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
  const [widthWindow, setWidthWindow] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      // 현재 창의 너비 확인
      setWidthWindow(window.innerWidth);
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
        <div style={{ position: "relative", height: isMobile? "92vh":"100vh", fontFamily:"cute" }}> 
        <DisplayImage widthWindow={widthWindow}/>
        <CategorySelector onSelectCategory={setSelectedCategory} />
        <ImageWithClickCounter category={selectedCategory} widthWindow={widthWindow} />
        
        <div style={{ 
            position: "absolute",
            bottom: "0", // 화면의 맨 밑에 위치
            width: "100%", // 전체 너비 사용
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
          
          <RankingSelector category={selectedCategory} widthWindow={widthWindow} />
        </div>
        
        <FloatingImageButton />
      </div>
      )}
    </>
  );
}

export default App;