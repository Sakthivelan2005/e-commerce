import React from 'react';
import './Footer.css'; // Style as needed
import { FaFacebookF, FaInstagram, FaTwitter, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed! 🎉");
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Company Info */}
        <div className="footer__section">
          <h2 className="footer__logo">Kirana Collections</h2>
          <p>Your destination for elegant, ethnic, and everyday fashion.</p>
          <div className="footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer__section">
          <h3>Explore</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQs</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer__section">
          <h3>Contact</h3>
          <p>Email: support@kiranafashion.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Chennai, Tamil Nadu, India</p>
        </div>

        {/* Newsletter */}
        <div className="footer__section">
          <h3>Subscribe</h3>
          <p>Stay updated on latest trends & offers</p>
          <form onSubmit={handleSubscribe} className="footer__newsletter">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Kirana Collections. All rights reserved.</p>
        <button onClick={scrollToTop} className="footer__scrollTop">
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
