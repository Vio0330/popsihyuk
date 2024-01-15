import React from 'react';
import styled from 'styled-components';

interface ImageProps {
  widthWindow: number;
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
  width: ${({ widthWindow }) => (widthWindow > 1210 ? '300px' : '30vw')};
  height: auto;
  margin: 0px;
`;

interface DisplayImageProps {
  widthWindow: number;
}

const DisplayImage: React.FC<DisplayImageProps> = ({ widthWindow }) => {
  return (
    <Container>
      <Image widthWindow={widthWindow} src="img/kpopcat_word_wp.webp" alt="Uploaded" />
    </Container>
  );
};

export default DisplayImage;
