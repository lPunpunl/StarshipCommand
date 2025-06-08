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
              A través del siguiente link pueden ver el código fuente de la aplicación: <a href="https://github.com/lPunpunl/StarshipCommand">https://github.com/lPunpunl/StarshipCommand</a>
            </p>
            <p>
              La aplicación se desarrolló por completo con JavaScript basándose en el stack MERN el cual son las siglas de las 4 tecnologías usadas para la creación de la aplicación, las cuales son:
            </p>
            <ul>
              <li>MongoDB</li>
              <li>Express.js</li>
              <li>React</li>
              <li>Node.js</li>
            </ul>
            <br></br>
            <h2>Desarrollo de la base de datos</h2>
            <p>
              La base de datos, como mencioné anteriormente, fue diseñada con MongoDB y por el momento existen dos colecciones: usuarios y agenda.
              Se aloja de forma remota en el servicio de nube gratuito de MongoDB Atlas que me permite tener un uso compartido de CPU, RAM y 512 MB de almacenamiento.
            </p>
            <br></br>
            <h2>Alojamiento de la aplicación</h2>
            <p>
              La aplicación se encuentra alojada en los servicios de Render que permite alojar tanto el backend como el frontend. Sin embargo, al usar la versión gratuita se encuentran grandes limitantes como el rendimiento del cliente o del servidor al recibir varias solicitudes simultáneamente. Pero la que más afecta es el modo de suspensión del servidor el cual al no recibir una solicitud en 15 minutos se apaga. Para que encienda, se debe realizar una nueva solicitud la cual tarda entre 30 a 60 segundos en completarse debido a que el servidor se está iniciando nuevamente. De momento mi solución fue usar el servicio de UptimeRobot que sirve para monitorear el servidor las 24 horas del día. Esta función de monitor envía una solicitud cada 5 minutos, lo cual me ayuda a mantener el servidor activo el tiempo que yo desee. Sin embargo, esto no es una buena práctica y es solo una solución temporal para que aquellos interesados que deseen visitar mi proyecto no tengan el inconveniente de esperar para poder acceder.
            </p>
            <br></br>
            <h2>Desarrollo del servidor</h2>
            <p>
              En el servidor desarrolle las funciones CRUD para la colección de usuario, agenda e inicio de sesión.
            </p>
            <p>
              En cuanto a la seguridad de las contraseñas use la librería bcrypt que hashea la contraseña del usuario al registrarse. Para cada inicio de sesión, haciendo uso de la misma librería, se comparan las contraseñas pero sin revelar la almacenada en la base de datos ya que se ha vuelto indescifrable.
            </p>
            <p>
              Para las sesiones utilice la librería jsonwebtoken la cual crea un token codificado con información del usuario, lo que me permite aplicar un middleware antes de cada función del servidor para evaluar si la sesión del usuario está activa, ha expirado o si cuenta con los permisos requeridos para ejecutarse.
            </p>
            <p>
              Para la API se aplicaron los métodos HTTP de acuerdo a la acción de cada función, ya sea para ver, guardar, editar o eliminar. La información se obtiene a través del cuerpo de la solicitud o dentro de la url como parámetro.
            </p>
            <br></br>
            <h2>Desarrollo del cliente</h2>
            <p>
              Como mencioné antes el cliente o interfaz de usuario fue desarrollada con React.
            </p>
            <p>
              La aplicación cuenta con tres páginas:
            </p>
            <ul>
              <li>Autenticación: se usa para registrarse o iniciar sesión.</li>
              <li>Página principal: la página principal donde se encuentra el acceso a cada una de las aplicaciones.</li>
              <li>Sobre esta página: página con información del desarrollador y del desarrollo.</li>
            </ul>
            <br></br>
            <h3>Personalización</h3>
            <p>
              Las imágenes de nebulosas y del fondo espacial fueron desarrolladas en la aplicación de escritorio Krita. Las estrellas son creadas y posicionadas de manera aleatoria a través de una función de JavaScript. De forma similar las nebulosas también se posicionan de forma aleatoria cada vez que se renderiza el componente con la condición de que no pueden tapar el espacio ocupado por el botón del layout para editar el perfil y cerrar sesión. 
            </p>
            <p>
              Debido a que me gusta el control y personalización completa de la aplicación no utilice ninguna librería para la interfaz. Probé opciones como Bootstrap para manejar las dimensiones y responsividad de los elementos o Toastify para mostrar notificaciones tipo toast, pero a nivel de desarrollo me pareció más comprensible y educativo desarrollar cada estilo por cuenta propia. Aunque quiero aclarar que esto lo hice por ser un proyecto propio, en cambio para un desarrollo profesional con tiempos de entrega definidos estoy totalmente dispuesto a usar las librerías que sean necesarias para desarrollar las aplicaciones en el mejor tiempo posible y a esforzarme en modificarlas lo suficiente para dar el estilo que sea requerido.
            </p>
            <p>
              Es entonces que el estilo fue hecho con CSS puro por la necesidad de personalización máxima, usando CSS módulos para evitar conflictos de estilos entre componentes y agregando una nomenclatura relacionada al componente que se está aplicando el diseño para identificar más fácilmente a qué elementos está afectando.
            </p>
            <p>
              Usé media queries para la responsividad de la aplicación agregando condicionales de anchura y alto a los componentes. Además de aplicar webkit para corregir errores de visualización en navegadores como Safari.
            </p>
            <p>
              Los efectos hover están dentro de una media querie hover:hover para que solo se activen en dispositivos que detecten un dispositivo apuntador como sería el mouse en una computadora o una tablet. Esto se hizo para inhabilitar el hover en los dispositivos touch como móviles para evitar que al presionar un botón se quede activado el efecto hover y como los botones con forma de nebulosa presentan una animación de escala para el tamaño del botón y del texto, al abrir una aplicación se queda con ese efecto hasta que se presione nuevamente la pantalla. Es por eso que para móviles están desactivados los hover personalizados y en cambio permite que cada navegador móvil aplique su propio estilo hover por defecto.
            </p>
            <br></br>
            <h3>Funciones y librerías</h3>
            <p>
              El efecto parallax se desarrolló con JavaScript calculando la posición del ratón en computadoras y la posición del toque en móviles, con la diferencia que en computadora el efecto parallax puede seguir el movimiento del mouse mientras que en moviles esa función se deshabilitó debido a que provocaba errores de interferencia con contenedores con scroll al seguir el movimiento del toque en pantalla.
            </p>
            <p>
              Utilice las librerías de Formik y Yup para controlar y validar el contenido ingresado en los inputs con el fin de evitar que se hagan solicitudes a la API a menos que se esté enviando información válida. Para doble precaución las funciones del servidor cuentan con las mismas condiciones para evitar enviar campos vacíos o NoSQL Injections a la base de datos.
            </p>
            <p>
              En caso de que se presente algún error o el sistema necesite informar algo al usuario desarrollé mi propio componente de notificaciones toast que, como parámetros, recibe el mensaje de error que haya enviado el servidor o el cliente, el tipo de alerta para cambiar el color e icono, y la posición donde se mostrará la alerta.
            </p>
            <p>
              Utilice la librería axios para hacer solicitudes a la API del servidor. Cada función tiene un control de errores en el que todo está encerrado en bloques try-catch. Si el servidor manda un estado de error, el bloque se activa y obtiene el mensaje de error por parte del servidor y lo muestra al usuario. En caso de que no haya respuesta del servidor se envía un mensaje genérico de error desconocido.
            </p>
            <p>
              Se usaron en gran medida los hooks de estado de React como useState para controlar valores de inputs o de variables utilizadas en diferentes funciones como lo es en el botón para cambiar de mes en la agenda en donde se utiliza una variable que indica si el efecto de animación será un desplazamiento a la derecha o a la izquierda. UseEffect para elementos que necesitan cambiar después de una acción en específico como lo es al editar una actividad, donde se debe obtener los valores de descripción y hora y pegarlos dentro de los inputs del formulario. UseRef para controlar el efecto parallax en los elementos que solo deben tenerlo.
            </p>
            <br></br>
            <h3>Agenda</h3>
            <p>
              Hasta el momento la aplicación de agenda es la que está completa. Para desarrollarla usé funciones de JavaScript para general el calendario y condicionales en cada día del mes para evaluar si cuenta con actividades o tareas asignadas, en caso de hacerlo, cambia de color de fondo y se muestra un punto amarilo en la esquina superio derecha a forma de notificación. Además de tener un color contrastante al fondo para mostrar el día presente.
            </p>
            <p>
              Para la paleta de colores de la aplicación no hubo una razón en especial. El color hexadecimal 221726 me pareció lindo y para los demás botones elegí el amarillo ya que es su color complementario. El color rojo tiene buen contraste así que lo utilicé para los botones de cerrar. Mi objetivo en los colores es que sean de una saturación alta pero con un nivel de brillo muy bajo.
            </p>
            <p>
              Utilicé la librería framer-motion para realizar animaciones de escala y opacidad al abrir o cerrar la aplicación. También utilicé la librería react-select ya que los elementos select por defecto no permiten modificar su estilo, tamaño o la cantidad de elementos mostrados, por lo que use esa dependencia para modificar solamente el alto, colores y efectos hover.
              Usé el mismo componente de formulario para editar o crear una actividad. Desde el componente padre se manda una prop con la función que efectuará el componente. Ese prop se usa para elegir el endpoint al que se hará la solicitud.
            </p>
            <p>
              A pesar de que el proyecto es pequeño y no cuenta con muchas funciones, el desarrollo fue difícil a su manera, especialmente durante la fase de prueba y error donde encontré demasiadas interferencias e incompatibilidades entre funciones, componentes y navegadores. Cada paso, cada función, cada contenido creado fue hecho, deshecho y reconstruido para solucionar problemas, arreglar errores de lógica, y es que en la interfaz de usuario no se puede dar a notar la cantidad de funciones que un simple botón necesita para que haga lo que tiene que hacer, o para que un componente muestre el contenido de la forma que debe de hacerlo. Estos desafíos me enseñaron la gran lección de siempre mantener buenas prácticas ya que, en caso de no hacerlo, a largo plazo las soluciones temporales terminan por afectar a otras funciones, retrasan el desarrollo y nos impiden ser mejores desarrolladores al no implementar soluciones complejas en un principio debido a querer hacer las cosas rápido.
            </p>
            <p>
              Espero que lo visto haya sido lo suficientemente informativo y claro para comprender la razón de su existencia y de su estilo artístico, que puedan apreciar el empeño y pasión aplicado en este proyecto que de no ser así este texto jamás habría existido, y que también puedan ver en mi esa inteligencia, responsabilidad y entusiasmo necesario para formar parte de un verdadero equipo y de un gran proyecto.
            </p>
            <p>
              Gracias por su atención.
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
