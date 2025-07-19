import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/project.css";
import playzone from '../images/playzone.png';
import coffeemania from '../images/coffeemania.png';
import harry from '../images/harry.png';
import textonomials from '../images/textonomials.png';
gsap.registerPlugin(ScrollTrigger);


function Projects() {

  const notDeployed = ()=>{
    alert("This project is on the path of deployment")

  }
 

    const leftArrowRef1 = useRef(null);
    const leftArrowRef2 = useRef(null);
    const rightArrowRef1 = useRef(null);
    const rightArrowRef2 = useRef(null);
    const projectATextRef = useRef(null);
    const projectBTextRef = useRef(null);
    const projectCTextRef = useRef(null);
    const projectDTextRef = useRef(null);
    const projectAImgRef = useRef(null);
    const projectBImgRef = useRef(null);
    const projectCImgRef = useRef(null);
    const projectDImgRef = useRef(null);
    const openingTextRef = useRef(null);

    useEffect(()=>{

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
                trigger: projectATextRef.current,
                start: "30% 80%",
                end: "bottom 60%",
                scrub: true,
                // markers:true,
              },
      });
     
         const tlB = gsap.timeline({
              scrollTrigger: {
                trigger: projectBTextRef.current,
                start: "30% 80%",
                end: "bottom 60%",
                scrub: true,
                // markers:true,
              },
      }); 
         const tlC = gsap.timeline({
              scrollTrigger: {
                trigger: projectCTextRef.current,
                start: "30% 80%",
                end: "bottom 60%",
                scrub: true,
                // markers:true,
              },
      }); 
         const tlD = gsap.timeline({
              scrollTrigger: {
                trigger: projectDTextRef.current,
                start: "30% 80%",
                end: "bottom 60%",
                scrub: true,
                // markers:true,
              },
      }); 
      
    tl.fromTo(
      projectATextRef.current,
      { y: 0, },
      { y: 35,  duration: 1, ease: "power2.out" }
    ).to(
      leftArrowRef1.current,
      { rotate: 15, duration: 1.2, ease: "power2.out" },
      "<"
    ).fromTo(
      projectAImgRef.current,
      { scale: 1.1, y: 50 },
      { scale: 1, y: 0, duration: 1.5, ease: "power3.out" },
      "<" 
    );

    tlB.fromTo(
      projectBTextRef.current,
      { y: 0, },
      { y: 35,  duration: 1, ease: "power2.out" }
    ).to(
      rightArrowRef1.current,
      { rotate: -15, duration: 1.2, ease: "power2.out" },
      "<"
    ).fromTo(
      projectBImgRef.current,
      { scale: 1.1, y: 50 },
      { scale: 1, y: 0, duration: 1.5, ease: "power3.out" },
      "<" 
    );

    tlC.fromTo(
      projectCTextRef.current,
      { y: 0, },
      { y: 35,  duration: 1, ease: "power2.out" }
    ).to(
      leftArrowRef2.current,
      { rotate: 15, duration: 1.2, ease: "power2.out" },
      "<"
    ).fromTo(
      projectCImgRef.current,
      { scale: 1.1, y: 50 },
      { scale: 1, y: 0, duration: 1.5, ease: "power3.out" },
      "<" 
    );

    tlD.fromTo(
      projectDTextRef.current,
      { y: 0, },
      { y: 35,  duration: 1, ease: "power2.out" }
    ).to(
      rightArrowRef2.current,
      { rotate: -15, duration: 1.2, ease: "power2.out" },
      "<"
    ).fromTo(
      projectDImgRef.current,
      { scale: 1.1, y: 50 },
      { scale: 1, y: 0, duration: 1.5, ease: "power3.out" },
      "<" 
    );

    },[])



  return (
    <div className="projects-holder">

      <div className="openingProject">
          <div className="openingProjectText" ref={openingTextRef}>A collection of work that highlights my skills in frontend, backend, and full-stack development.</div>
      </div>

      {/* Project 1 */}
      <div className="project-section">
        <div className="project-text-left">
          <div className="left-arrow" ref={leftArrowRef1}>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="left-text" ref={projectATextRef}>
            <h2 className="project-title">Darz-Textonomials</h2>
            <p className="project-subtitle">unique chat-style protfolio concept</p>
            <button className="show-button"><a href="https://darz-textonomials.netlify.app/" target="_blank">show</a></button>
          </div>
        </div>
        <div className="project-img-right" ref={projectAImgRef}>
          <img src={textonomials} alt="Darz-textonomials" />
        </div>
      </div>

      {/* Project 2 */}
      <div className="project-section">
        <div className="project-img-left" ref={projectBImgRef}>
          <img src={harry} alt="harry-ai" />
        </div>
        <div className="project-text-right">
         <div className="right-text" ref={projectBTextRef}>
            <h2 className="project-title">Harry-talkingAI</h2>
            <p className="project-subtitle">a talking AI system works with web-speechlistener</p>
            <button className="show-button"><a href="https://harry-ai.netlify.app/" target="_blank">show</a></button>
         </div>
         <div className="right-arrow" ref={rightArrowRef1}>
            <i className="fa-solid fa-arrow-left"></i>
          </div>
        </div>
      </div>

       {/* Project 3 */}
      <div className="project-section">
        <div className="project-text-left">
          <div className="left-arrow" ref={leftArrowRef2}>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="left-text" ref={projectCTextRef}>
            <h2 className="project-title">Playzone</h2>
            <p className="project-subtitle">Multi-game web app (Snake, Chess, etc.)</p>
            <button className="show-button"><a onClick={notDeployed}>Not deployed yet</a></button>
          </div>
        </div>
        <div className="project-img-right" ref={projectCImgRef}>
          <img src={playzone} alt="Playzone Project" />
        </div>
      </div>

      
      {/* Project 4 */}
      <div className="project-section">
        <div className="project-img-left" ref={projectDImgRef}>
          <img src={coffeemania} alt="coffemania" />
        </div>
        <div className="project-text-right">
         <div className="right-text" ref={projectDTextRef}>
            <h2 className="project-title">coffeemania</h2>
            <p className="project-subtitle">coffee products selling ecommerce website.</p>
            <button className="show-button"><a onClick={notDeployed}>Not deployed yet</a></button>
         </div>
         <div className="right-arrow" ref={rightArrowRef2}>
            <i className="fa-solid fa-arrow-left"></i>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Projects;
