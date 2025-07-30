import React, { useEffect, useRef } from "react";
import "../styles/footer.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const visionRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    // Animate footer-vision text (letter-by-letter)
    const letters = visionRef.current.textContent.split("");
    visionRef.current.innerHTML = letters
      .map((letter) =>
        letter === " " ? `<span class="space"> </span>` : `<span class="letter">${letter}</span>`
      )
      .join("");
    
      //foter logo
      
      gsap.fromTo(
  ".footer-logo",
  {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".footer-logo",
      start: "top 95%",
    },
  }
);

// footer-mid

    gsap.fromTo(
      visionRef.current.querySelectorAll(".letter"),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power4.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: visionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate footer-nav columns
gsap.fromTo(
  navRef.current.querySelectorAll(".nav-column"),
  {
    x: -100,
    opacity: 0,
    rotate: -5,
  },
  {
    x: 0,
    opacity: 1,
    rotate: 0,
    duration: 1,
    ease: "power3.out",
    stagger: {
      each: 0.2,
      from: "start",
    },
    scrollTrigger: {
      trigger: navRef.current,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  }
);

//footer-bottom
gsap.fromTo(
  ".footer-bottom",
  {
    y: 30,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".footer-bottom",
      start: "top 95%",
      toggleActions: "play none none none",
    },
  }
);



  }, []);

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <div className="footer-myimg"></div>
          <div className="footer-myname">Darshan Khute</div>
        </div>
        <div className="footer-nav" ref={navRef}>
          <div className="nav-column">
            <h4>Navigation</h4>
            <Link to="/">home</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="nav-column">
            <h4>Work</h4>
            <Link to="/projects">Projects</Link>
            <Link to="/contact">Contact Me</Link>
          </div>
          <div className="nav-column">
            <h4>Socials</h4>
            <div><a href="https://www.instagram.com/hoyydarshann.16/" target="_blank">instagram</a></div>
            <div><a href="https://github.com/dev-kdarshan" target="_blank">github</a></div>
            <div><a href="https://www.facebook.com/darshan.khute.5?rdid=xa9PKqKKqxxlr67l&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FGp8BTLZrMbzB5oEg%2F" target="_blank">facebook</a></div>
            <div><a href="https://www.linkedin.com/in/darshan-khute-89220a258/" target="_blank">linkedin</a></div>
          </div>
        </div>
      </div>

      <div className="footer-vision">
        <h1 ref={visionRef}>Let's Work Together!</h1>
      </div>

      <div className="footer-bottom">
        <p>© 2025, Darshan Khute. All Rights Reserved.</p>
        <a href="#" className="back-to-top">Back to top ↑</a>
      </div>
    </footer>
  );
};

export default Footer;
