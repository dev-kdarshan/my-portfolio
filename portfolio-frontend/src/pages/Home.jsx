import React, { useRef, useEffect, useState } from "react";
import "../styles/home.css";
import html from "../images/html.png"
import css from "../images/css.png"
import js from "../images/js.png"
import react from "../images/react.png"
import express from "../images/express.png"
import node from "../images/node.jpg"
import mongoDB from "../images/mongodb.jpg"
import firebase from "../images/firebase.png"
import tailwind from "../images/tailwind.png"
import gsapimg from "../images/gsap.png"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const cursorRef = useRef(null);
  const homeRef = useRef(null);
  const containerSecRef = useRef(null);
  const subtitleRef = useRef(null);
  const skillContentRef = useRef(null);
  const angleRef = useRef(null);
  const socialLinkRef = useRef(null);
  const textRef = useRef(null);
  const homeContainerRef = useRef(null);
  const rollingContainerRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [time, setTime] = useState(new Date());
  const hours = time.getHours() % 12 || 12;
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const ampm = time.getHours() >= 12 ? "PM" : "AM";
  const skills = [html, css, js, react, express, node, mongoDB, gsapimg, firebase, tailwind];
  const skillStyle = (image) => ({
    background: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius:"1rem",
    margin:"5%"
  });

  const phrases = [
    "Turning code into creativity.",
    "Crafting seamless digital experiences.",
    "From frontend polish to backend logic — it's all here.",
  ];
 
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const home = homeRef.current;
    const container = containerSecRef.current;
    const skillParent = skillContentRef.current;
    const socialArrow = angleRef.current;
    const socialLink = socialLinkRef.current;
    const subtitle = subtitleRef.current;
    
    const tl = gsap.timeline({ repeat: Infinity});
    phrases.forEach((text, i) => {
      tl.to(subtitle, {
        opacity: 0,
        duration: 1,
        delay:1,
        onComplete: () => {
          subtitle.textContent = text;
        },
      });
      tl.to(subtitle, { opacity: 1, duration: 1, });
    });

    
    const handleMouseEnter = (e) => {
      if (e.target.classList.contains("skill-item")) {
        gsap.to(e.target, {
          x: gsap.utils.random(-15, 15),
          y: gsap.utils.random(-15, 15),
          rotate: gsap.utils.random(-20, 20),
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.classList.contains("skill-item")) {
        gsap.to(e.target, {
          x: 0,
          y: 0,
          rotate: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
      }
    };

    const resetItems = () => {
      gsap.to(".skill-item", {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
        stagger: 0.03,
      });
    };

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const hideCursor = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
    };

    const showCursor = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
    };

    const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 800);
    };

    // const textWidth = textRef.current.offsetWidth;
    console.log(textRef.current.offsetWidth)
    gsap.to(rollingContainerRef.current, {
      x: "100%",
      duration: 5,
      ease: 'linear',
      repeat: Infinity,
    });

    const socialArrowEnter = () => {
        gsap.to(socialArrow, {
          rotate:90, 
          duration: 0.3,
          ease: "power2.out",
        });
    };
    
    const socialArrowLeave = () => {
        gsap.to(socialArrow, {
          rotate: 0, 
          duration: 0.3,
          ease: "power2.out",
        });
    };
    

    gsap.to(container, {
          width: "90vw",
          scrollTrigger: {
              trigger: container,
              start: "top 80%",
              end: "50% 20%",
              scrub: true,
              
          },
     });

    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);


    home.addEventListener("mousemove", moveCursor);
    home.addEventListener("mouseleave", hideCursor);
    home.addEventListener("mouseenter", showCursor);
    home.addEventListener("click", handleClick);
    skillParent.addEventListener("mouseover", handleMouseEnter);
    skillParent.addEventListener("mouseout", handleMouseLeave);
    skillParent.addEventListener("mouseleave", resetItems);
    socialLink.addEventListener("mouseenter", socialArrowEnter);
    socialLink.addEventListener("mouseleave", socialArrowLeave);


// ScrollTrigger.refresh(); 
    return () => {
      clearInterval(timerId);
      home.removeEventListener("mousemove", moveCursor);
      home.removeEventListener("mouseleave", hideCursor);
      home.removeEventListener("mouseenter", showCursor);
      home.removeEventListener("click", handleClick);
      skillParent.removeEventListener("mouseover", handleMouseEnter);
      skillParent.removeEventListener("mouseout", handleMouseLeave);
      skillParent.removeEventListener("mouseleave", resetItems);
      socialLink.removeEventListener("mouseenter", socialArrowEnter);
      socialLink.removeEventListener("mouseleave", socialArrowLeave);
    };

  }, []);

  return (
    <div className="home-holder" ref={homeRef}>
      <div ref={cursorRef} className="custom-cursor">
        {clicked && <span className="click-text">Click!</span>}
      </div>

    
        <div className="home-container"ref={homeContainerRef} >

          <div className="headline-text">
            <span>Pixels&nbsp;</span> 
            <span>to&nbsp;</span> 
            <span>Perfection</span> 
          </div>

          <div className="subtitle-text" ref={subtitleRef}>
            <pre style={{ fontFamily: "var(--text-fontFamily)" }}>From frontend polish to backend logic — it's all here.</pre>
          </div>

          <div className="badge-holder">
            <div className="status-badge">
              <span className="status-dot" />
              <span className="status-text">Available for work</span>
            </div>
          </div>

          <div className="home-holder-sec" >
            <div  className="home-container-sec"ref={containerSecRef} >
                {/* section left */}
                <div className="left">
                <div className="img-holder"></div>
                  <div className="hobbies">
                    <div className="hobbie"><p>Poet:I express feelings in verses.</p></div>
                    <div className="hobbie"><p>Lyricist:I write words to music.</p></div>
                    <div className="hobbie"><p>Writer:I shape thoughts into words.</p></div>
                  </div>   
                </div>

                {/* section middle */}
                <div className="middle">
                  <div className="introduction-text">
                    <div className="intro-name">
                      <h1>I am Darshan</h1>
                    </div>
                    <div className="intro-info">
                      <p>I am a passionate web developer focused on creating dynamic and engaging digital experiences. I enjoy bringing ideas to life through clean and responsive interfaces. My approach centers around building web applications that are both functional and user-friendly. I’m driven by curiosity and the constant desire to improve and learn. Each project is an opportunity to craft something meaningful and impactful. I aim to blend creativity with logic to deliver well-rounded web solutions.</p>
                    </div>
                  </div>
                  <div className="home-contact">
                    <div className="contact-connector">
                     <div className="contact-text" ref={rollingContainerRef}>
                        <div className="rollingText" >
                          <p className="mernDeveloper" ref={textRef}>MERN stack developer &nbsp;</p>
                          {/* <p className="mernDeveloper" ref={textRef}>MERN stack developer &nbsp;</p> */}
                        </div>
                     </div>
                  </div>
                   <div className="mycv">
                          <a href="https://drive.google.com/file/d/1XHEoyDIl7UJypE-Jn-2KLcJlctu7PJNZ/view?usp=sharing" download="Darshan CV" class="show-cv" id="showCv" target="_blank">show CV</a>
                    </div>
                  </div>
                  <div className="mid-end">
                    <div className="skills">
                        <div className="skill-head"><h1>skills</h1></div>
                        <div className="skill-content" ref={skillContentRef}>
                          {/* <div className="html" style={{background:`url(${html})`,backgroundSize: "contain",backgroundRepeat:"no-repeat",height:"100px",width:"100px"}}></div>
                          <div className="html" style={{background:`url(${css})`,backgroundSize: "contain",backgroundRepeat:"no-repeat",height:"100px",width:"100px"}}></div>
                          <div className="html" style={{background:`url(${js})`,backgroundSize: "contain",backgroundRepeat:"no-repeat",height:"100px",width:"100px"}}></div>
                          <div className="html" style={{background:`url(${react})`,backgroundSize: "contain",backgroundRepeat:"no-repeat",height:"100px",width:"100px"}}></div>
                          <div className="html" style={{background:`url(${express})`,backgroundSize: "contain",backgroundRepeat:"no-repeat",height:"100px",width:"100px"}}></div>
                          <div className="html" style={{background:`url(${node})`,backgroundSize: "contain",backgroundRepeat:"no-repeat",height:"100px",width:"100px"}}></div>
                          <div className="html" style={{background:`url(${mongoDB})`,backgroundSize: "contain",backgroundRepeat:"no-repeat",height:"100px",width:"100px"}}></div>
                          <div className="html" style={{background:`url(${gsapimg})`,backgroundSize: "contain",backgroundRepeat:"no-repeat",height:"100px",width:"100px"}}></div>
                          <div className="html" style={{background:`url(${firebase})`,backgroundSize: "contain",backgroundRepeat:"no-repeat",height:"100px",width:"100px"}}></div>
                          <div className="html" style={{background:`url(${tailwind})`,backgroundSize: "contain",backgroundRepeat:"no-repeat",height:"100px",width:"100px"}}></div> */}
                          {skills.map((img, index) => (
                            <div key={index} className="skill-item" style={skillStyle(img)}></div>
                          ))}
                        </div>
                    </div>
                    <div className="local-time">
                          <div className="local-time-upper">
                              <div className="time">
                                  {hours}:{minutes}
                              </div>
                              <div className="ampm">{ampm}</div>
                          </div>
                          <div className="label">Current local time</div>
                    </div>
                  </div>
                </div>

                {/* section right */}
                <div className="right">
                  <div className="social-links" ref={socialLinkRef}>
                    <div className="social-links-head">
                      <span>Connect me</span><div ref={angleRef}><i class="fa-solid fa-angle-right"></i></div>
                    </div>
                        <div className="social-links-content">
                              <div className="social-link"><a href="https://www.instagram.com/hoyydarshann.16/" target="_blank"><i class="fa-brands fa-square-instagram"></i></a></div>
                              <div className="social-link"><a href="https://github.com/dev-kdarshan" target="_blank"><i class="fa-brands fa-square-github"></i></a></div>
                              <div className="social-link"><a href="https://www.facebook.com/darshan.khute.5?rdid=xa9PKqKKqxxlr67l&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FGp8BTLZrMbzB5oEg%2F" target="_blank"><i class="fa-brands fa-square-facebook"></i></a></div>
                              <div className="social-link"><a href="https://www.linkedin.com/in/darshan-khute-89220a258/" target="_blank"><i class="fa-brands fa-linkedin"></i></a></div>
                        </div>
                  </div>
                  <div className="question"></div>
                </div>

              </div>
          </div>
          
      </div>
    </div>
  );
}

export default Home;


