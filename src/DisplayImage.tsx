import React, { useEffect, useState } from 'react';
import { storage } from './firebase';
import { ref, getDownloadURL } from 'firebase/storage';

interface DisplayImageProps {
  imagePath: string;
  logoPath: string;
}

const DisplayImage: React.FC<DisplayImageProps> = ({ imagePath, logoPath }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string>('');

  useEffect(() => {
    if (!imagePath) {
      return;
    }
    if (!logoPath) {
        return;
      }
    const imageRef = ref(storage, imagePath);
    const logoRef = ref(storage,logoPath);
    const fetchImageUrl = async () => {
      try {
        const url_image = await getDownloadURL(imageRef);
        setImageUrl(url_image);
        const url_logo = await getDownloadURL(logoRef);
        setLogoUrl(url_logo);
      } catch (error) {
        console.error("이미지를 불러오는 중 에러가 발생했습니다:", error);
      }
    };

    fetchImageUrl();
  }, [imagePath, logoPath]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center', // 가로 방향에서 중앙 정렬
      height: '30vh', // 뷰포트 높이를 100%로 설정하여 전체 화면에 걸쳐 표시
    }}>
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '250px', maxHeight: '250px', margin: '10px' }} />
      ) : (
        <p>이미지 로딩 중...</p>
      )}
      {logoUrl ? (
        <img src={logoUrl} alt="Uploaded" style={{ maxWidth: '300px', maxHeight: '300px', margin: '10px' }} />
      ) : (
        <p>로고 로딩 중...</p>
      )}
    </div>
  );
};

export default DisplayImage;
