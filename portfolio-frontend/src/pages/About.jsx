import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/about.css"
gsap.registerPlugin(ScrollTrigger);
function About() {

  const openingTextRef = useRef(null);
  const aboutImgRef = useRef(null);
  const aboutTextRef = useRef(null);
  const aboutArrowRef = useRef(null);
  const yiHeadlineRef = useRef(null);
  const yiArrowRef = useRef(null);
  const yiTextRef = useRef(null);
  const yiImgRef = useRef(null);


  useEffect(() => {
    gsap.fromTo(
      openingTextRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.1,
      }
    );

    const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutTextRef.current,
          start: "30% 80%",
          end: "bottom 60%",
          scrub: true,
        },
      });

    const tlB = gsap.timeline({
      scrollTrigger: {
        trigger: yiHeadlineRef.current,
        start: "top 85%", // adjust as needed
        end: "bottom 60%",
        toggleActions: "play none none reverse",
        scrub: true,
        // markers: true,
      },
    });


    tl.fromTo(
      aboutTextRef.current,
      { y: 0, },
      { y: 35,  duration: 1, ease: "power2.out" }
    ).to(
      aboutArrowRef.current,
      { rotate: 15, duration: 1.2, ease: "power2.out" },
      "<"
    ).fromTo(
      aboutImgRef.current,
      { scale: 1.1, y: 50 },
      { scale: 1, y: 0, duration: 1.5, ease: "power3.out" },
      "<" 
    );

    gsap.fromTo(".dot", {opacity: 0,},{
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
      
    tlB.fromTo(
      yiHeadlineRef.current,
      {
        y: 50,
        opacity: 0,
        clipPath: "inset(0 0 100% 0)",
      },
      {
        y: 0,
        opacity: 1,
        clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        ease: "power4.out",
      }
    ).fromTo(
      yiTextRef.current,
      { y: 0, },
      { y: 35,  duration: 1, ease: "power2.out" }
    ).to(
      yiArrowRef.current,
      { rotate: -25, duration: 1.2, ease: "power2.out" },
      "<"
    ).fromTo(
      yiImgRef.current,
      { scale: 1.1, y: 50 },
      { scale: 0.85, y: 0, duration: 1.5, ease: "power3.out" },
      "<" 
    );


  }, []);

  return (
    <div className='about-holder'>
      <div className="about-container">

        <div className="openingAbout">
          <div className="openingAboutText" ref={openingTextRef}>On a journey to create thoughtful and engaging digital products.</div>
        </div>

        <div className='myInformation'>
          <div className="myInformationArrow" ref={aboutArrowRef}>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="myinformationText" >
            <p ref={aboutTextRef}>As a recent graduate stepping into the world of web development, I'm focused on building clean, responsive, and user-friendly applications. I believe in continuous learning and growing through every line of code I write.</p>
          </div>
          <div className="aboutimg-holder" ref={aboutImgRef}></div>
        </div>

        <div className="mySkills">
          <p className="mySkillsText">
            I can
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </p>
          <div className="skillSet">
            <div className="skill">
                <p className='skillNo'>01</p>
                <p className='skillHead'>Design Dynamic Interfaces</p>
                <p className='skillText'>Build interactive, performance-optimized user interfaces using React and animate them with GSAP for a fluid UX.</p>
            </div>
            <div className="skill">
                <p className='skillNo'>02</p>
                <p className='skillHead'>Backend & Data Handling</p>
                <p className='skillText'>Architect RESTful APIs using Node.js and Express, with secure data storage in MongoDB and Firestore.</p>
            </div>
            <div className="skill">
                <p className='skillNo'>03</p>
                <p className='skillHead'>Authentication & Programming Skills</p>
                <p className='skillText'>Integrate Firebase for user authentication and bring strong programming foundations with experience in C, C++, and Python.</p>
            </div>
          </div>
        </div>
        
        <div className="partofYi">
            <div><p className="parrtofYi-headline"  ref={yiHeadlineRef}>the part of...</p></div>
            <div>
              <div className="yiArrow" ref={yiArrowRef}>
                <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="yiImg-holder" ref={yiImgRef}></div>
            <div className="yiText">
              <p ref={yiTextRef}>As the Branding Co-Chair of Yi KKWIEER, I contributed to the creative direction and promotion of various social impact events. From designing visuals to executing outreach campaigns, my work focused on engaging the community through thoughtful and impactful communication.</p>
            </div>
          </div>
      </div>
    </div>
  </div>
  )
}

export default About
