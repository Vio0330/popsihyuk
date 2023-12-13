import React, { useEffect, useState } from 'react';
import { storage } from './firebase';
import { ref, getDownloadURL } from 'firebase/storage';

interface DisplayImageProps {
  logoPath: string;
}

const DisplayImage: React.FC<DisplayImageProps> = ({ logoPath }) => {
  const [logoUrl, setLogoUrl] = useState<string>('');

  useEffect(() => {
    if (!logoPath) {
        return;
      }
    const logoRef = ref(storage,logoPath);
    const fetchImageUrl = async () => {
      try {
        const url_logo = await getDownloadURL(logoRef);
        setLogoUrl(url_logo);
      } catch (error) {
        console.error("이미지를 불러오는 중 에러가 발생했습니다:", error);
      }
    };

    fetchImageUrl();
  }, [ logoPath]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '20vh', // Changed from 'height' to 'minHeight'
      width: '100%', // Ensure the div takes the full width
    }}>
      {logoUrl ? (
        <img src={logoUrl} alt="Uploaded" style={{ maxWidth: '10%', maxHeight: '5%', margin: '0px' }} />
      ) : (
        <p>로고 로딩 중...</p>
      )}
    </div>
    
    
  );
};

export default DisplayImage;
