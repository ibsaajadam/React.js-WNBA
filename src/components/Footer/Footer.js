import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      &#169; WNBA {(new Date().getFullYear())}
    </div>
  )
}

export default Footer