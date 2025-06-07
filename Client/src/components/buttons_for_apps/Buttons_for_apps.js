import React, { useEffect, useState, useRef } from 'react';
import styles from './Buttons_for_apps.module.css';
import { Agenda } from '../apps/Agenda/Agenda';
import { Diario } from '../apps/Diario/Diario'
import { GastosDiarios } from '../apps/GastosDiarios/GastosDiarios'
import { AboutThePage } from '../AboutThePage/AboutThePage'
import { useNavigate } from 'react-router-dom';

const BUTTONS = [
  { id: 1, label: 'Agenda', srcSetLowQuality: '/nebulosa_221726_400px.webp', srcSetMediumQuality: '/nebulosa_221726_600px.webp', srcSetHighQuality: '/nebulosa_221726_800px.webp', component: Agenda },
  { id: 2, label: 'Diario', srcSetLowQuality: '/nebulosa_EB5900_400px.webp', srcSetMediumQuality: '/nebulosa_EB5900_600px.webp', srcSetHighQuality: '/nebulosa_EB5900_800px.webp', component: Diario },
  { id: 3, label: 'Próximamente', srcSetLowQuality: '/nebulosa_2b5121_v3_400px.webp', srcSetMediumQuality: '/nebulosa_2b5121_v3_600px.webp', srcSetHighQuality: '/nebulosa_2b5121_v3_800px.webp', component: GastosDiarios },
  { id: 4, label: 'Sobre esta página', srcSetLowQuality: '/nebulosa_A01A20_v4_400px.webp', srcSetMediumQuality: '/nebulosa_A01A20_v4_600px.webp', srcSetHighQuality: '/nebulosa_A01A20_v4_800px.webp', component: AboutThePage, componentString: 'AboutThePage' },
  // Agrega más botones aquí en el futuro
];

const forbiddenZone = {
    top: 2, // o 0 si es exacto desde el top
    left: 75.55, // 100 - 24.44
    width: 24.44,
    height: 5.9
  };

export const Buttons_for_apps = ({ children }) => {
  const navigate = useNavigate();
  const buttonContainerRef = useRef()
  const [activeComponent, setActiveComponent] = useState(null);
  const [positions, setPositions] = useState([]);
  const buttonSize = window.innerWidth < 600
  ? { width: 50, height: 15 }
  : { width: 20, height: 20 };
  //const [buttonSize, setButtonSize] = useState(initialSize);

  /*useEffect(() => {
  const isMobile = window.innerWidth < 600;
  const size = isMobile
    ? { width: 50, height: 10 }
    : { width: 30, height: 30 };

  setButtonSize(size);
}, []);*/

  const generatePositions = () => {
    const generated = [forbiddenZone];
    const attempts = 2000;

    const isOverlapping = (a, b) => {
      return !(
        a.left + buttonSize.width < b.left ||
        a.left > b.left + buttonSize.width ||
        a.top + buttonSize.height < b.top ||
        a.top > b.top + buttonSize.height
      );
    };

    for (let i = 0; i < BUTTONS.length; i++) {
      let pos;
      let tries = 0;

      do {
        const left = Math.random() * (100 - buttonSize.width);
        const top = Math.random() * (100 - buttonSize.height);
        pos = { top, left };
        tries++;
      } while (
        generated.some((g) => isOverlapping(g, pos)) &&
        tries < attempts
      );

      generated.push(pos);
    }

    setPositions(generated.slice(1));
  };

  const handleButtonClick = (btn) => {
    if (btn.componentString === 'AboutThePage') {
      navigate('/aboutthepage', { replace: true })
    }
    setActiveComponent(btn.id);
  };

  const handleClose = () => {
    setActiveComponent(null);
  };

  const renderComponent = () => {
    const active = BUTTONS.find((b) => b.id === activeComponent);
    if (active && active.component) {
      const Component = active.component;
      return <Component onClose={handleClose} />;
    }
    return null;
  };

  useEffect(() => {
    if (!buttonSize) return;
    generatePositions();
    //window.addEventListener("resize", generatePositions);
    //return () => window.removeEventListener("resize", generatePositions);
  }, []);

  
useEffect(() => {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let animationFrameId;
  const easing = 0.1;

  const moveButtons = () => {
    currentX += (targetX - currentX) * easing;
    currentY += (targetY - currentY) * easing;

    if (buttonContainerRef.current) {
      buttonContainerRef.current.style.transform = `translate(${-currentX}px, ${-currentY}px)`;
    }

    animationFrameId = requestAnimationFrame(moveButtons);
  };

  const handleMouseMove = (e) => {
    targetX = (e.clientX / window.innerWidth - 0.6) * 20;
    targetY = (e.clientY / window.innerHeight - 0.6) * 20;
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      targetX = (touch.clientX / window.innerWidth - 0.6) * 20;
      targetY = (touch.clientY / window.innerHeight - 0.6) * 20;
    }
  };

  moveButtons();

  window.addEventListener('mousemove', handleMouseMove);
  //window.addEventListener('touchmove', handleTouchMove, { passive: false });

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('mousemove', handleMouseMove);
    //window.removeEventListener('touchmove', handleTouchMove);
  };
}, []);

  return (
    <div className={styles.bfa_container}>
      <div ref={buttonContainerRef}>
        {BUTTONS.map((btn, i) => (
          <button
            key={btn.id}
            className={styles.bfa_button}
            onClick={() => handleButtonClick(btn)}
            disabled={activeComponent !== null}
            style={{
              top: `${positions[i]?.top}dvh`,
              left: `${positions[i]?.left}vw`,
              width: `${buttonSize.width}vw`,
              height: `${buttonSize.height}dvh`
            }}
          >
            <span className={styles.bfa_button_text}>{btn.label}</span>
            <picture>
              <source media="(min-width: 1800px)" srcSet={btn.srcSetHighQuality} />
              <source media="(min-width: 1000px)" srcSet={btn.srcSetMediumQuality} />
              <img src={btn.srcSetLowQuality} className={styles.bfa_nebula_image}/>
            </picture>
          </button>
        ))}
        
      </div>
      {children}
      {renderComponent()}
    </div>
  );
};