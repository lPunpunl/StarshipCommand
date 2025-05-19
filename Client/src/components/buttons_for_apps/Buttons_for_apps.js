import React, { useEffect, useState } from 'react';
import styles from './Buttons_for_apps.module.css';
import { Agenda } from '../apps/Agenda/Agenda';
import { Buscaminas } from '../apps/Buscaminas/Buscaminas';

const BUTTONS = [
  { id: 1, label: 'Agenda', srcSet: '/boton-agenda', component: Agenda },
  { id: 2, label: 'Diario', srcSet: '/boton-diario', component: Agenda },
  { id: 3, label: 'Créditos', srcSet: '/boton-creditos', component: Agenda },
  { id: 4, label: 'Buscaminas', srcSet: '/boton-buscaminas', component: Agenda },
  // Agrega más botones aquí en el futuro
];

const forbiddenZone = {
    top: 2, // o 0 si es exacto desde el top
    left: 75.55, // 100 - 24.44
    width: 24.44,
    height: 5.9
  };

export const Buttons_for_apps = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [positions, setPositions] = useState([]);
  

  const buttonSize = { width: 30, height: 20 }; // en vw y vh

  const generatePositions = () => {
    const generated = [forbiddenZone];
    const attempts = 1000;

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

  const handleButtonClick = (id) => {
    setActiveComponent(id);
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
    generatePositions();
    window.addEventListener("resize", generatePositions);
    return () => window.removeEventListener("resize", generatePositions);
  }, []);

  return (
    <div className={styles.bfa_container}>
      {BUTTONS.map((btn, i) => (
        <button
          key={btn.id}
          className={styles.bfa_button}
          onClick={() => handleButtonClick(btn.id)}
          disabled={activeComponent !== null}
          style={{
            top: `${positions[i]?.top}vh`,
            left: `${positions[i]?.left}vw`,
            width: `${buttonSize.width}vw`,
            height: `${buttonSize.height}vh`,
          }}
        >
          {/**<picture>
            <source media="(min-width: 1200px)" srcSet={`${btn.srcSet}-1x.png`} />
            <source media="(min-width: 600px)" srcSet={`${btn.srcSet}-0.5x.png`} />
            <img
              src={`${btn.srcSet}-2x.png`}
              alt={btn.label}
              className={styles.bfa_button_img}
            />
          </picture> */}
          <span className={styles.bfa_button_text}>{btn.label}</span>
        </button>
      ))}
      {children}
      {renderComponent()}
    </div>
  );
};