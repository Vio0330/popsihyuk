import React, { useState, useEffect } from 'react';
import { storage } from './firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import './FloatingImageButton.css'; // Import the CSS for styling

interface FloatingImageButtonProps {
  imageSrc: string; // Source of the main image to display
  coffeebutton: string; // Source of the coffee image button
  tossbutton: string; // Source of the toss image button
}

const FloatingImageButton: React.FC<FloatingImageButtonProps> = ({ imageSrc, coffeebutton, tossbutton }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [coffeeImageUrl, setCoffeeImageUrl] = useState('');
  const [tossImageUrl, setTossImageUrl] = useState('');

  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchImageUrl = async (imgSrc: string) => {
      if (!imgSrc) return '';
      try {
        const imageRef = ref(storage, imgSrc);
        const url = await getDownloadURL(imageRef);
        return url;
      } catch (error) {
        console.error("Error loading image:", error);
        return '';
      }
    };

    fetchImageUrl(imageSrc).then(setImageUrl);
  }, [imageSrc]);

  

  const fetchImageFromDB = async (key: string) => {
    try {
      const imageRef = ref(storage, key); // Adjust this path as per your DB structure
      const snapshot = await getDownloadURL(imageRef);
      return snapshot;
      } catch (error) {
        console.error("Error loading image:", error);
        return '';
      }
  };

  const togglePopup = async () => {
    console.log("Toggling popup");
    setIsPopupVisible(!isPopupVisible);

    // Fetch images only if the popup is being opened
    if (!isPopupVisible) {
      const coffeeUrl = await fetchImageFromDB(coffeebutton);
      const tossUrl = await fetchImageFromDB(tossbutton);
      setCoffeeImageUrl(coffeeUrl);
      setTossImageUrl(tossUrl);
    }
  };
  useEffect(() => {
    console.log("Popup visibility:", isPopupVisible); // Debugging
  }, [isPopupVisible]);

  return (
    <>
      <button className="floating-image-button" style={{ top: 100 }} onClick={togglePopup}>
        <img src={imageUrl} alt="Floating" />
      </button>

      {isPopupVisible && (
  <>
    {/* Backdrop */}
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000 // High z-index
    }} onClick={togglePopup}></div>

    {/* Popup */}
    <div className="image-popup" style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1001, // Even higher z-index
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <a href="https://www.buymeacoffee.com/kpopcat" className="image-popup-button" style={{ display: 'inline-block', width: '100px', height: '100px', padding: '10px', textAlign: 'center' }}>
  <img src={coffeeImageUrl} alt="Coffee Button" style={{ maxWidth: '100%', maxHeight: '100%' }} />
</a>
<a href="https://toss.me/kpopcat" className="image-popup-button" style={{ display: 'inline-block', width: '100px', height: '100px', padding: '10px', textAlign: 'center' }}>
  <img src={tossImageUrl} alt="Toss Button" style={{ maxWidth: '100%', maxHeight: '100%' }} />
</a>
    </div>
  </>
)}
    </>
  );
};

export default FloatingImageButton;