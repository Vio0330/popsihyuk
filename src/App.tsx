import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import LoadingScreen from "./components/loading-screen";
import CategorySelector from './CategorySelector';
import CategoryClicksRanking from "./CategoryClicksRanking";
import DisplayImage from "./DisplayImage";
import FloatingImageButton from "./FloatingImageButton";
import ImageWithClickCounter from "./ImageAndCounter";
import CoffeeRanking from "./CoffeeRanking";


const GlobalStyles = createGlobalStyle`
  ${reset};
  // 나머지 스타일
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('BTS');
  const imagePath = "kpopcat.png"
  const logoPath = "kpopcat_word.png"
  const init = async () => {
    setTimeout(() => setIsLoading(false), 1000);
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
        <div>
          
          {/* <div style={{ position: "relative" }}>
            <DisplayImage imagePath={imagePath} logoPath={logoPath} />

            <div style={{
              position: "absolute",
              top: "150px",     // Position from the top of the outer div
              left: 0,          // Align to the left of the outer div
              width: '100%',    // Match the width of the outer div
              height: '100%',   // Match the height of the outer div
            }}>
              <ClickCounter category={selectedCategory} />
            </div>
          </div> */}
          <DisplayImage logoPath={logoPath}/>
          <ImageWithClickCounter imagePath={imagePath}  category={selectedCategory}/>
          <CategorySelector onSelectCategory={setSelectedCategory} />
          <CategoryClicksRanking category={selectedCategory} />
          <CoffeeRanking category={selectedCategory}/>
          <FloatingImageButton imageSrc="circlecoffee.png" coffeebutton="buymeacoffee.png" tossbutton="toss2.png"/>
        </div>
      )}
    </>
  );
}

export default App;
