import React from 'react';
import styled from 'styled-components';

interface ImageProps {
  mode: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 20vh;
  width: 100vw;
  margin-bottom: 0px;
`;

const Image = styled.img<ImageProps>`
  width: ${({ mode }) => (mode === 4 ? '300px' : '30vw')};
  height: auto;
  margin: 0px;
`;

interface DisplayImageProps {
  mode: number;
}

const DisplayImage: React.FC<DisplayImageProps> = ({ mode }) => {

  return (
    <Container>
      
      <Image mode={mode} src="img/kpopcat_word_wp.webp" alt="Uploaded" />
    </Container>
  );
};

export default DisplayImage;
