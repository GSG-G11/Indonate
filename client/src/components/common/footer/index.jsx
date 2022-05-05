import React from 'react';
import './style.less';
import facebook from './facebook1.svg';
import instagram from './instagram.svg';
import youtube from './youtube.svg';
import twitter from './twitter.svg';
import google from './google.svg';
import indonate from './indonate.svg';

function Footer() {
  return (
    <section className="footer_container">
      <div className="hr_lines">
        <hr className="line" />
        <img className="icon" src={facebook} alt="Facebook" />
        <img className="icon" src={instagram} alt="Instagram" />
        <img className="icon" src={youtube} alt="Youtube" />
        <img className="icon" src={twitter} alt="Twitter" />
        <img className="icon" src={google} alt="Google" />
        <hr className="line" />
      </div>
      <div>
        <img className="logo" src={indonate} alt="indonate" />
      </div>
    </section>
  );
}

export default Footer;
