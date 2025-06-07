import React, { useState, useRef } from 'react';
import styles from './AboutThePage.module.css';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, MoveLeft, ArrowRight } from 'lucide-react';
import { ReactMagnifierImage } from './ReactMagnifierImage'

export const AboutThePage = () => {
  const [section, setSection] = useState('aboutme');
  const [darkMode, setDarkMode] = useState(true)
  const navigate = useNavigate();
  const abtContainerRef = useRef(null);


  const renderContent = () => {
    switch(section) {
      case 'aboutme': 
        return (
          <div className={styles.abt_content}>
            <h1>Sobre mí</h1>
            <p>
              Mi nombre es Harold Alejandro Zapien Lomelí. Nací el 22 de septiembre de 2002 en Coatzacoalcos Veracruz. 
              Soy ingeniero en sistemas computacionales egresado de la Universidad Tres Culturas plantel Zona Rosa.
            </p>
            <p>
              Viví en la ciudad de México durante mis estudios universitarios. En cuanto acabaron regresé a mi ciudad natal. Durante meses busqué trabajo relacionado a mi ingeniería y no lo conseguí debido a que no existe tal oferta laboral en la zona. Fue entonces que empecé a trabajar en una tienda de refacciones para aires acondicionados y posteriormente tuve la suerte de conseguir un trabajo de home office. Agente telefónico de ventas en inglés. Siempre se me ha dado bien ese idioma y aquel trabajó me ayudó a mejorar mi nivel de fluidez y comprensión.
              Sin embargo, soy apasionado a la programación y a los rompecabezas lógicos que en este se presentan, es por eso que he decidido mudarme de vuelta a la capital del país para aplicar mis conocimientos de forma profesional y mejorar en todo aspecto posible para ser un especialista en programación. 
            </p>
            <p>
              Para conseguir mi objetivo de ser un programador experto necesito dos cosas.
            </p>
            <ul>
              <li>Demostrar mis habilidades a mis futuros entrevistadores.</li>
              <li>Volverme alguien eficiente, concentrado y determinado a cumplir mis objetivos.</li>
            </ul>
            <p>
              Es por eso que mi conclusión fue desarrollar una aplicación web en la cual dentro contiene aplicaciones pequeñas enfocadas a mis necesidades y que presenté una interfaz única, diferente, artística y dinámica que pueda generar una emoción de asombro y agrado a los usuarios.
            Salí de la escuela con una afinidad al desarrollo backend para páginas web, por lo que crear el diseño para esta aplicación fue lo que más tiempo me tomó. 
            </p>
            <p>
              Durante los tres meses de desarrollo que me tomó crear la primera versión de la aplicación tuve que reforzar conocimientos y aprender muchos nuevos. nunca esperé que yo, que me considero alguien poco creativo, terminaría volviéndome en un adicto del estilizado con css para generar interfaces responsivas con atractivas paletas de colores. entre los nuevos aprendizajes se encuentra la teoría de color, tipografía y diseño gráfico. 
            </p>
            <p>
              La idea principal de la página era estar dentro de una nave espacial, los botones a las aplicaciones serían la interfaz que tendría uno dentro de una cabina de control. Eso cambió en cuanto busqué referencias de otras páginas para inspirarme y el punto decisivo fue cuando encontré la página diamonds in the sky. Esta página fue desarrollada como medio publicitario para una campaña de marketing de la empresa 77diamonds, una tienda de joyería de diamantes y gemas preciosas. La página presenta el espacio exterior con textura nubosa, nebulosas de vibrantes colores, parpadeantes estrellas de varios colores y tamaños y que junto con el fondo espacial ofrecen un efecto parallax para dar efecto de profundidad y todo complementado con un efecto de sonido discreto pero elegante. Quedé fascinado. 
            </p>
            <p>
              Como se habrán dado cuenta me he enfocado en hablar más del aspecto gráfico que lógico de la aplicación. Esto sucede debido a que me es afín desarrollar soluciones lógicas de acuerdo a las necesidades y limitaciones de la aplicación. Si bien es cierto que para crear una función existen diferentes formas de hacerlo, el uso de buenas prácticas y la consideración de la escala limita el resultado a unas pocas opciones. En cambio, el diseño me parece algo tan abstracto, en especial porque para esta aplicación no existe ningún precedente o imagen corporativa a la cual hacer alusión. Aunque eso mismo es lo que me permitió experimentar colores que no pude usar en anteriores aplicaciones. Si bien es cierto que existen fuentes de inspiración, encontrar las formas y colores perfectos están tan relacionados a la personalidad del artista que el resultado no refleja todas las decisiones que se tomaron.
            </p>
            <p>
              Quiero desarrollar muchas páginas y aplicaciones web para aumentar mi conocimiento y perspectiva tanto para el campo frontend como el backend. Quiero conocer mejores formas de diseñar una interfaz y aumentar la eficacia y seguridad de las funciones del servidor. Deseo encontrarme con grandes desafíos pues solo eso, la constancia y la disciplina es lo que me convertirá en lo que anhelo ser.
            </p>
            <p>
              A continuación hablaré de detalles técnicos de la aplicación, por el momento, gracias por su atención.
            </p>
            <div className={styles.abt_continue_button_div}>
              <button className={styles.abt_continue_button} onClick={() => handleContinue('development')}><ArrowRight size={'40px'}/></button>
              <p className={styles.abt_continue_text}>Continuar</p>
            </div>
            
          </div>
        );
      case 'development':
        return (
          <div className={styles.abt_content}>
            <h1>Desarrollo</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
            </p>
            <div className={styles.abt_continue_button_div}>
              <button className={styles.abt_continue_button} onClick={() => handleContinue('gallery')}><ArrowRight size={'40px'}/></button>
              <p className={styles.abt_continue_text}>Continuar</p>
            </div>
          </div>
        );
      case 'gallery':
        return (
          <div className={styles.abt_content}>
            <h1>Galería</h1>
            <p>A continuación una muestra de las imagenes creadas con la herramienta Krita.</p>
            <div className={styles.abt_gallery_image_container}>
              <p style={{opacity: '60%'}}>Haz doble click en la imagen para hacer zoom y desplazarte.</p>
              <ReactMagnifierImage src='/galeria_nebulosa_221726.png'/>
              <p className={styles.abt_gallery_text}>Nebulosa 221726</p>
            </div>
            <div className={styles.abt_gallery_image_container}>
              <ReactMagnifierImage src='/galeria_nebulosa_a01a20.png'/>
              <p className={styles.abt_gallery_text}>Nebulosa A01A20</p>
            </div>
            <div className={styles.abt_gallery_image_container}>
              <ReactMagnifierImage src='/galeria_nebulosa_2b5121.png'/>
              <p className={styles.abt_gallery_text}>Nebulosa 2B5121</p>
            </div>
            <div className={styles.abt_gallery_image_container}>
              <ReactMagnifierImage src='/galeria_nebulosa_eb5900.png'/>
              <p className={styles.abt_gallery_text}>Nebulosa EB5900</p>
            </div>
            <div className={styles.abt_gallery_image_container}>
              <ReactMagnifierImage src='/galeria_fondo_estelar.png'/>
              <p className={styles.abt_gallery_text}>Fondo estelar</p>
            </div>
            
          </div>
        );
      default:
        return <h1>Sección no encontrada</h1>
    }
  }

  const handleGoBackClick = () => {

    navigate('/', { replace: true })
  }

  const handleDarkMode = () => {
    setDarkMode(prev => !prev);
  }

  const handleContinue = ( section) => {
    if (abtContainerRef.current) {
      abtContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setSection(section);
  }

  return (
    <div className={`${styles.abt_container} ${darkMode ? styles.abt_container_darkmode : styles.abt_container_lightmode}`} ref={abtContainerRef}>
      <div className={styles.abt_content_container}>
        <div className={`${styles.abt_header} ${darkMode ? styles.abt_header_darkmode : ''}`}>
          <h1>HAROLD LOMELÍ</h1>
          <button onClick={handleDarkMode} className={`${styles.abt_handle_darkmode_button} ${darkMode ? styles.abt_handle_darkmode_button_darkmode : ''}`}>
            {darkMode ? <Moon /> : <Sun />}
          </button>
          
        </div>
        <div className={styles.abt_header_buttons}>
          <div className={styles.abt_goback_container}>
            <button onClick={handleGoBackClick} className={`${styles.abt_goback_button} ${darkMode ? styles.abt_goback_button_darkmode : ''}`}> <MoveLeft size={'20px'} style={{ marginRight: '0.5em' }}/> {" "}Regresar</button>
          </div>
          <div className={styles.abt_content_buttons_container}>
            <button onClick={() => setSection('aboutme')} className={`${styles.abt_content_buttons} ${darkMode ? styles.abt_content_buttons_darkmode : ''} ${section === 'aboutme' ? styles.abt_content_button_focus : ''}`}>Sobre mí</button>
            <button onClick={() => setSection('development')} className={`${styles.abt_content_buttons} ${darkMode ? styles.abt_content_buttons_darkmode : ''} ${section === 'development' ? styles.abt_content_button_focus : ''}`}>Desarrollo</button>
            <button onClick={() => setSection('gallery')} className={`${styles.abt_content_buttons} ${darkMode ? styles.abt_content_buttons_darkmode : ''} ${section === 'gallery' ? styles.abt_content_button_focus : ''}`}>Galería</button>
          </div>
        </div>
        <div>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
