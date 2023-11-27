import React, { useState } from 'react';
import styled from 'styled-components';



const SearchResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  width: 100%;
  background-color: white;
  z-index: 1000;
  margin-top: 8px; // 검색창과의 간격 추가
`;

const SearchResult = styled.button`
  padding: 10px;
  border: none;
  border-bottom: 1px solid #eee;
  background: white;
  text-align: left;
  width: 100%;

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
  
    const filteredCategories = categories
      .filter(category => category.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(category => category.toLowerCase() !== searchTerm.toLowerCase())
      .slice(0, 8);
  
    const handleSelectCategory = (category: string) => {
      setSearchTerm(category); // 검색창에 선택된 카테고리를 설정
      onSelectCategory(category);
    };
  
    return (
        <div>
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {(
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