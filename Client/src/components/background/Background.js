import styles from './Background.module.css'
import { useEffect, useRef } from "react";

export const Background = ({ children }) => {
  // En tu JS global (ejecutar en mount o inicio)
  function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  // Ejecutar al cargar y cuando cambia el tamaño
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);
  setViewportHeight();

  const backgroundRef = useRef();
  const smallStarsRef = useRef();
  const mediumStarsRef = useRef();
  const largeStarsRef = useRef();

  useEffect(() => {
  const picture = backgroundRef.current;
  const img = picture?.querySelector("img");

  if (!img) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let animationFrameId;

  const easing = 0.1; // Velocidad de suavizado (0.05 es lento, 0.1 es más rápido)

  const moveElements = () => {
     // Interpolar entre la posición actual y la deseada
     currentX += (targetX - currentX) * easing;
     currentY += (targetY - currentY) * easing;

    img.style.transform = `translate(${-currentX}px, ${-currentY}px)`;

    if (smallStarsRef.current) {
      smallStarsRef.current.style.transform = `translate(${-currentX * 1.1}px, ${-currentY * 1.1}px)`;
    }
    if (mediumStarsRef.current) {
      mediumStarsRef.current.style.transform = `translate(${-currentX * 1.5}px, ${-currentY * 1.5}px)`;
    }
    if (largeStarsRef.current) {
      largeStarsRef.current.style.transform = `translate(${-currentX * 2}px, ${-currentY * 2}px)`;
    }
    
    // Volver a llamar al siguiente frame
    animationFrameId = requestAnimationFrame(moveElements);
  };

  const handleMouseMove = (e) => {
    targetX = (e.clientX / window.innerWidth - 0.6) * 20;
    targetY = (e.clientY / window.innerHeight - 0.6) * 20;
  };

  const handleTouchMove = (e) => {
    e.preventDefault()
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      targetX = (touch.clientX / window.innerWidth - 0.6) * 20;
      targetY = (touch.clientY / window.innerHeight - 0.6) * 20;
    }
  };

  const randomX = Math.floor(Math.random() * 100);
  const randomY = Math.floor(Math.random() * 100);
  img.style.objectPosition = `${randomX}% ${randomY}%`;

  moveElements();

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("touchmove", handleTouchMove, { passive: false }); // 'passive: true' ayuda al rendimiento

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("touchmove", handleTouchMove);
    cancelAnimationFrame(animationFrameId)
  };
}, []);

  const generateStars = (amount, minSize, maxSize) => {
    const stars = [];
    for (let i = 0; i < amount; i++) {
      const size = Math.random() * (maxSize - minSize) + minSize;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 2000;

      stars.push(
        <span
          key={`star-${minSize}-${i}`}
          style={{
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            background: 'white',
            borderRadius: '50%',
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
            top: `${top}%`,
            left: `${left}%`,
            animation: `${styles.twinkle} 2s infinite ease-in-out ${delay}ms`,
          }}
        ></span>
      );
    }
    return stars;
  };

    return(
      <div className={styles.app}>
        <div className={styles.background_wrapper}>
          <picture ref={backgroundRef}>
            <source media="(min-width: 1800px)" srcSet="/background_v3_2560px.webp" />
            <source media="(min-width: 1000px)" srcSet="/background_v3_1920px.webp" />
            <img src="/background_v3_1357px.webp" className={styles.background_img}/>
          </picture>
        </div>

        <div className={styles.bg_container_stars} ref={smallStarsRef}>
              {generateStars(60, 1, 1)}
        </div>
        <div className={styles.bg_container_stars} ref={mediumStarsRef}>
              {generateStars(80, 1.1, 1.3)}
        </div>
        <div className={styles.bg_container_stars} ref={largeStarsRef}>
              {generateStars(60, 1.4, 1.5)}
              
        </div>
        {children}
      </div>
    )
};

