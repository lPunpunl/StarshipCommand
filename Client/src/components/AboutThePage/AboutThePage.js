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
