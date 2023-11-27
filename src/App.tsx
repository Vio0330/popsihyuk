import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import { useEffect, useState } from "react";
import Profile from "./routes/profile";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import LoadingScreen from "./components/loading-screen";
import ClickCounter from "./ClickCounter";
import CategorySelector from './CategorySelector';
import CategoryClicksRanking from "./CategoryClicksRanking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <CategoryClicksRanking />,
      },
      {
        path: "Profile",
        element: <Profile />,
      },
    ]
  }
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  // 나머지 스타일
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('BTS');

  const init = async () => {
    setTimeout(() => setIsLoading(false), 2000);
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
          <CategorySelector onSelectCategory={setSelectedCategory} />
          <ClickCounter category={selectedCategory} />
          <RouterProvider router={router}/>
        </div>
      )}
    </>
  );
}

export default App;
