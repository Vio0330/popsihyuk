import React, { KeyboardEvent, useState } from 'react';
import styled from 'styled-components';

const SearchResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  width: 56vw;
  background-color: white;
  z-index: 10;
  margin: 57px;
`;

const SearchResult = styled.button`
  padding: 10px;
  border: none;
  border-bottom: 1px solid #eee;
  background: white;
  text-align: left;
  width: 100%;
  font-family: cute;
  font-size: 30px;
  &:hover {
    background-color: #f9f9f9;
  }
`;

interface CategorySelectorProps {
    onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelectCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['BTS', '르세라핌', '아이브', '뉴진스', 'nmixx', '뉴세라핌', '아이들', '첫사랑', 'stuvio', '봉준호'];
  const [isFocus, setIsFocus] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [preSelectCategory, setPreSelectCategory] = useState('');

  const filteredCategories = categories
    .filter(category => category.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(()=>!isSelected||isFocus)
    .slice(0, 5);

  const handleSelectCategory = (category: string) => {
    setSearchTerm(category); // 검색창에 선택된 카테고리를 설정
    onSelectCategory(category);
    setIsSelected(true);
  };

  const setIsFocusTrue = () => {
    setIsFocus(true);
    setIsSelected(false);
  }

  const handleKeyPress = (event:KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      setIsSelected(true);
      if (categories.includes(preSelectCategory)) onSelectCategory(preSelectCategory);
      (document.activeElement as HTMLElement)?.blur();
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <input
        type="text"
        placeholder="검색..."
        value={searchTerm}
        onFocus={setIsFocusTrue}
        onBlur={()=>setIsFocus(false)}
        onChange={(e) => {setSearchTerm(e.target.value); setPreSelectCategory(e.target.value);}}
        onKeyDown={(e)=>handleKeyPress(e)}
        style={{
          fontFamily: 'cute',
          padding: '10px',
          margin: '5px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '30px',
          width: '55vw',
        }}
      />
      {filteredCategories.length > 0 && (
        <SearchResultsContainer>
          {filteredCategories.map(category => (
            <SearchResult key={category} onClick={() => handleSelectCategory(category)}>
              {category}
            </SearchResult>
          ))}
        </SearchResultsContainer>
      )}
    </div>
  );
};
  
export default CategorySelector;