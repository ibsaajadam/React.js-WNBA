import React from 'react';
import Banner from '../../images/wnba-banner.jpeg';
import './Header.css'

function Header() {
  return (
    <div className="banner">
        <div className="jobs">
          <h1 className="title">WNBA Jobs</h1>
          <p className="desc">Search our current job openings below</p>
        </div>
     <img src={Banner} alt="WNBA" />
    </div>
  )
}

export default Header