

const DisplayImage= () => {


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '20vh', // Changed from 'height' to 'minHeight'
      width: '100%', // Ensure the div takes the full width
      marginBottom: "0px"
    }}>
      {
        <img src="img/kpopcat_word_wp.webp" alt="Uploaded" style={{ maxWidth: '10%', maxHeight: '5%', margin: '0px' }} />}
    </div>
    
    
  );
};

export default DisplayImage;
