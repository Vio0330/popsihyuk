import React, { useEffect, useState } from 'react';
import { storage } from './firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import './FloatingImageButton.css'; // Import the CSS for styling

interface FloatingImageButtonProps {
  imageSrc: string; // Source of the image to display
}

const FloatingImageButton: React.FC<FloatingImageButtonProps> = ({ imageSrc }) => {
    const [imageUrl, setImageUrl] = useState<string>('');
//   const [scrollY, setScrollY] = useState<number>(0);

//   const handleScroll = () => {
//     setScrollY(window.scrollY);
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);


    useEffect(() => {
    if (!imageSrc) {
      return;
    }
    const imageRef = ref(storage, imageSrc);
    const fetchImageUrl = async () => {
      try {
        const url_image = await getDownloadURL(imageRef);
        setImageUrl(url_image);
      } catch (error) {
        console.error("이미지를 불러오는 중 에러가 발생했습니다:", error);
      }
    };

    fetchImageUrl();
  }, [imageSrc]);
  return (
    <button className="floating-image-button" style={{ top: 100 }}>
      <img src={imageUrl} alt="Floating" />
    </button>
  );
};

export default FloatingImageButton;
