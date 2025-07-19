import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import "../styles/home.css";

const greetings = [
  "Hello",
  "Bonjour",
  "स्वागत हे",
  "Ciao",
  "Olá",
  "おい",
  "नमस्ते",
  "Guten tag",
  "Hola",
];

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    textRefs.current.forEach((ref, i) => {
      tl.fromTo(
        ref,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
      )
      .to(ref, {
        opacity: 0,
        y: -50,
        duration: 0.2,
        ease: "power2.in",
        delay: 0.2,
      });
    });

    tl.to(preloaderRef.current, {
      y: "-100%",
      duration: 1,
      borderBottomLeftRadius: "60% 100%",
      borderBottomRightRadius: "60% 100%",
      ease: "power2.inOut",
    });

  }, [onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      {greetings.map((text, index) => (
        <h1
          key={index}
          ref={(el) => (textRefs.current[index] = el)}
          style={{ position: "absolute" }}
        >
          {text}
        </h1>
      ))}
    </div>
  );
};

export default Preloader;
