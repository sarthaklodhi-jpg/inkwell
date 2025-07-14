import React from 'react';
// 1. Import the image file directly into the component
import logoSrc from '../assets/Gemini_Generated_Image_ivpre0ivpre0ivpr.png';

function Logo({ width = '100px' }) {
  return (
    // 2. Use the imported variable in the src attribute
    // 3. Apply the width prop and add descriptive alt text for accessibility
    <img 
      src={logoSrc} 
      style={{ width: width }} 
      alt="InkWell Logo" 
    />
  );
}

export default Logo;