import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import LoadingScreen from "./components/loading-screen";
import ClickCounter from "./ClickCounter";
import CategorySelector from './CategorySelector';
import CategoryClicksRanking from "./CategoryClicksRanking";
import DisplayImage from "./DisplayImage";
import { CheckoutPage } from "./Toss";



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
          <DisplayImage imagePath={imagePath} logoPath={logoPath}></DisplayImage>
          <CategorySelector onSelectCategory={setSelectedCategory} />
          <ClickCounter category={selectedCategory} />
          <CategoryClicksRanking category={selectedCategory} />
          <CheckoutPage />
        </div>
      )}
    </>
  );
}

export default App;
