import { useState, useEffect } from 'react';
import './FloatingImageButton.css'; // Import the CSS for styling


const FloatingImageButton=() => {

  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  


  const togglePopup = async () => {
    console.log("Toggling popup");
    setIsPopupVisible(!isPopupVisible);

  };
  useEffect(() => {
    console.log("Popup visibility:", isPopupVisible); // Debugging
  }, [isPopupVisible]);

  return (
    <>
      <button className="floating-image-button" style={{ top: 100 }} onClick={togglePopup}>
        <img src="img/circlecoffee_wp.webp" alt="Floating" />
        <p style={{color:'white', fontSize: '30px', margin: '10px'}}>click this button</p>
        <p style={{color:'white', fontSize: '30px'}}>for donation!</p>
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
      display: 'flex',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1001, // Even higher z-index
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '18vw',
    }}>
      <a href="https://www.buymeacoffee.com/kpopcat" className="image-popup-button" style={{ display: 'inline-block', width: '40%', height: '20%', padding: '10px', textAlign: 'center' }}>
  <img src="img/buymeacoffee_wp.webp" alt="Coffee Button" style={{ maxWidth: '100%', maxHeight: '100%' }} />
</a>
<a href="https://toss.me/kpopcat" className="image-popup-button" style={{ display: 'inline-block', width: '40%', height: '20%', padding: '10px' }}>
  <img src="img/toss2_wp.webp" alt="Toss Button" style={{ maxWidth: '100%', maxHeight: '100%' }} />
</a>
    </div>
  </>
)}
    </>
  );
};

export default FloatingImageButton;