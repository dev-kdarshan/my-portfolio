import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { gsap } from "gsap";

function Navbar() {
  const navCreditRef = useRef(null);
  const copyrightRef = useRef(null);
  const codeByRef = useRef(null);
  const darshanRef = useRef(null);
  const khuteRef = useRef(null);
  const arrowRef = useRef(null);
  const navRightRef = useRef(null);
  const underlineRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
  const el = navCreditRef.current;
  const navRightEl = navRightRef.current;
  const arrow = arrowRef.current;

  const isDesktop = window.innerWidth > 768;

  if (isDesktop) {
    // Initial GSAP setup
    gsap.set(khuteRef.current, { opacity: 0, x: 20, position: "absolute", right: 0, top: 0 });
    gsap.set(codeByRef.current, { opacity: 1, x: 0, position: "relative" });
    gsap.set(darshanRef.current, { x: 0, position: "relative" });
    gsap.set(copyrightRef.current, { rotation: 0 });

    // Hover animation
    const handleMouseEnter = () => {
      gsap.to(copyrightRef.current, { rotation: 360, duration: 0.6 });
      gsap.to(codeByRef.current, { x: -20, opacity: 0, duration: 0.4 });
      gsap.to(darshanRef.current, { x: -80, duration: 0.4 });
      gsap.to(khuteRef.current, { x: -18, opacity: 1, duration: 0.4 });
    };

    const handleMouseLeave = () => {
      gsap.to(copyrightRef.current, { rotation: 0, duration: 0.6 });
      gsap.to(codeByRef.current, { x: 0, opacity: 1, duration: 0.4 });
      gsap.to(darshanRef.current, { x: 0, duration: 0.4 });
      gsap.to(khuteRef.current, { x: 20, opacity: 0, duration: 0.4 });
    };

    const handleEnter = () => {
      gsap.to(arrow, { rotate: -45, duration: 0.3 });
      gsap.to(underlineRef.current, { scaleX: 1, transformOrigin: "left", duration: 0.4 });
    };

    const handleLeave = () => {
      gsap.to(arrow, { rotate: 0, duration: 0.3 });
      gsap.to(underlineRef.current, { scaleX: 0, transformOrigin: "right", duration: 0.4 });
    };

    navRightEl.addEventListener("mouseenter", handleEnter);
    navRightEl.addEventListener("mouseleave", handleLeave);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      navRightEl.removeEventListener("mouseenter", handleEnter);
      navRightEl.removeEventListener("mouseleave", handleLeave);
    };
  }
}, []);


  return (
    <div className="nav-holder">
      <div className="nav-container">
        <div className="nav-left">
          <Link className="navlinks" to="/">
             <div className="nav-credit" ref={navCreditRef} style={{ position: "relative", display:"flex",padding:"0 0 0 0.1rem" }}>
              <span className="copyright" ref={copyrightRef}>
                ©
              </span>
              <span className="code-by" ref={codeByRef} style={{ position: "relative" }}>
                code by
              </span>
              <span className="darshan" ref={darshanRef} style={{ position: "relative" }}>
                darshan
              </span>
              <span className="khute" ref={khuteRef} style={{ opacity: 0 }}>
                khute
              </span>
            </div>
          </Link>
        </div>

     
          <div className="nav-mid">
            <Link className="navlinks" to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <span>|</span>
            <Link className="navlinks" to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
          </div>
          <div className="nav-right" ref={navRightRef}>
            <Link className="navlinks" to="/contact" onClick={() => setMenuOpen(false)}>
              <span className="talk-text">
                talk
                <span className="hover-underline" ref={underlineRef}></span>
              </span>
            </Link>
            <div className="arrow" ref={arrowRef}>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>

  );
}

export default Navbar;
