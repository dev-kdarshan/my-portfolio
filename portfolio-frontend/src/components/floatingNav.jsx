import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/floatingnav.css';

const FloatingNav = () => {
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      setVisible(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setVisible(true);
      }, 250);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  return (
    <div className={`floating-nav ${visible ? 'visible' : 'hidden'}`}>
      <Link to="/about">about</Link>
      <span className="divider" />
      <Link to="/projects">projects</Link>
    </div>
  );
};

export default FloatingNav;
