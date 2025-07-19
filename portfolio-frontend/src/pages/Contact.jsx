import React, { useEffect, useRef, useState } from 'react';
import "../styles/contact.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const contactArrowRef = useRef(null);
  const socialRef = useRef(null);
  const linkRef = useRef(null);
  const formRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  // console.log(backendURL)

  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    email: ''
  });

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: socialRef.current,
        start: "30% 80%",
        end: "bottom 60%",
        scrub: true,
      },
    });

    tl.fromTo(
      socialRef.current,
      { y: 0 },
      { y: 35, duration: 1, ease: "power2.out" },
      "<"
    ).fromTo(
      formRef.current,
      { y: 0 },
      { y: 35, duration: 1, ease: "power2.out" },
      "<"
    ).to(
      contactArrowRef.current,
      { rotate: 30, duration: 1.2, ease: "power2.out" },
      "<"
    ).fromTo(
      linkRef.current,
      { y: 0 },
      { y: 35, duration: 1, ease: "power2.out" },
      "<"
    );

    gsap.fromTo(".dot", { opacity: 0 }, {
      opacity: 1,
      y: -3,
      duration: 1,
      stagger: {
        each: 0.2,
        repeat: -1,
        yoyo: true,
      },
      ease: "power1.inOut",
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendURL}/submit`, formData); 
      alert("Message sent successfully!");
      setFormData({ name: '', detail: '', email: '' });
    } catch (error) {
      alert("There was a problem submitting the form.");
      console.error(error);
    }
  };

  return (
    <div className="contact-holder">
      <div className="contact-container">
        <div className="contact-top">
          <p className="contact-top-head">Let's get started
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </p>
          <p className="contact-top-body">
            I'm excited to hear from you! Whether it's a freelance opportunity,
            collaboration, or just a hello — let's make it happen. Fill in your
            details and I'll get back to you soon.
          </p>
        </div>

        <div className="contact-mid">
          <div className="contact-socials">
            <div className="contactArrow" ref={contactArrowRef}>
              <i className="fa-solid fa-arrow-right"></i>
            </div>

            <div className="contact-details">
              <p className="socials-head" ref={socialRef}>socials</p>
              <div className="contact-links" ref={linkRef}>
                <div className="link"><a href="#"><i className="fa-brands fa-facebook-f"></i></a></div>
                <div className="link"><a href="#"><i className="fa-brands fa-instagram"></i></a></div>
                <div className="link"><a href="#"><i className="fa-brands fa-github"></i></a></div>
                <div className="link"><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></div>
              </div>
            </div>
          </div>

          <div className="contact-form" ref={formRef}>
            <form onSubmit={handleSubmit}>
              <p>
                My name is
                <input
                  type="text"
                  name="name"
                  placeholder="YOUR FULL NAME"
                  required
                  value={formData.name}
                  onChange={handleChange}
                /> and I
              </p>
              <p>
                have a
                <input
                  type="text"
                  name="detail"
                  placeholder="WEBSITE, FULL-TIME JOB, ETC."
                  required
                  value={formData.detail}
                  onChange={handleChange}
                /> that
              </p>
              <p>needs help. You can reach me at</p>
              <p>
                <input
                  type="email"
                  name="email"
                  placeholder="YOUR EMAIL ADDRESS"
                  required
                  value={formData.email}
                  onChange={handleChange}
                /> to get
              </p>
              <p>things started.</p>
              <button type="submit" className="send-info" >— SEND INFO</button>
            </form>
          </div>
        </div>

        <div className="contact-footer">
          <div className="footer-copyright">
            © 2025, Darshan Khute. All Rights Reserved
          </div>
          <div className="footer-mailme">
            <a href="mailto:darshankhute2215n@outlook.com">
              {isMobile ? (
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
        ) : (
          "click here to mail me!"
        )}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
