import styles from './Agenda.module.css';
import React, { useState, useEffect } from 'react';
import { Agenda_actividades } from './Agenda_actividades';
import { getActivitiesByMonth } from "../../../api/agenda";
import { Formulario_actividades } from './Formulario_actividades';
import Toast from '../../utils/Toast';

export const Agenda = ({ onClose }) =>{
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [monthActivities, setMonthActivities] = useState([]);
    const [loading, setLoading] = useState([]);
    const [updateFetch, setUpdateFetch] = useState();
    const [isInvisible, setIsInvisible]= useState(false);

    const [toast, setToast] = useState(null);
        const showToast = (message, type, position) =>{
          setToast({message, type, position});
        };

    const userFromLS = localStorage.getItem('user');
    const token = localStorage.getItem('jwtToken');
    const user_id = localStorage.getItem('_id');

    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 600);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    //funcion para obtener las actividades del mes
    const fetchActivitiesByMonth = async () => {
      setLoading(true);
      try {
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const activities = await getActivitiesByMonth( month, year, token, user_id);
        setMonthActivities(activities);
      } catch (error) {
        showToast(error.message, "error", "top")
      } finally {
        setLoading(false);
      }
    };

    const updateFetchFunction = (time) => {
      setUpdateFetch(time);
    }

    useEffect(()=>{
      fetchActivitiesByMonth()
    }, [currentDate, updateFetch]);
  
    // Funciones para cambiar de mes
    const goToPreviousMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };
  
    const goToNextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };
  
    // Función para seleccionar un día
    const handleDayClick = (day) => {
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        setSelectedDate({day, month, year});

        setIsInvisible(true);
    };
    

    // Función para generar los días del mes
    const renderCalendar = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDayOfMonth = new Date(year, month, 1);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const startingDay = firstDayOfMonth.getDay(); // Día de la semana en que comienza el mes

      const today = new Date(); // Fecha actual
      const todayDay = today.getDate();
      const todayMonth = today.getMonth();
      const todayYear = today.getFullYear();
  
      const calendarDays = [];
  
      // Rellenar días vacíos al inicio del mes
      for (let i = 0; i < startingDay; i++) {
        calendarDays.push(<div key={`empty-${i}`} className={styles.agenda_empty_day}></div>);
      }

  
      // Rellenar los días del mes
      for (let day = 1; day <= daysInMonth; day++) {
        const stringDay = day.toString();
        const stringMonth = (month + 1).toString();
        const stringYear = year.toString();
        const hasActivities = monthActivities.some(activity => activity.day === stringDay && activity.month === stringMonth && activity.year === stringYear);

        const isToday = day === todayDay && month === todayMonth && year === todayYear;

        calendarDays.push(
          <span
            key={day}
            className={`${styles.agenda_calendar_day} ${isToday ? styles.agenda_current_day : hasActivities ? styles.agenda_has_activities : ''}`}
            onClick={() => handleDayClick(day)}
          >
            {day}
            {hasActivities && <span className={styles.agenda_activity_dot}></span>}
          </span>
        );
      }

      // Rellenar días vacíos al final del mes para completar la última fila
      const totalCells = calendarDays.length;
      const remainingCells = 7 - (totalCells % 7); // Días vacíos necesarios para completar la última fila
      if (remainingCells < 7) { // Solo agregar días vacíos si no está completa
      for (let i = 0; i < remainingCells; i++) {
        calendarDays.push(<div key={`empty-end-${i}`} className={styles.agenda_empty_day}></div>);
        }
      }

      return calendarDays;
    };

    const handleClose = () => {
        setSelectedDate(null); // Oculta el componente
        setIsInvisible(false);
    };

    const renderComponent = () => {
        if (selectedDate != null){
          try {
            const activitiesForSelectedDay = monthActivities.filter(activity =>{
            return(
              activity.day === selectedDate.day.toString() &&
              activity.month === selectedDate.month.toString() &&
              activity.year === selectedDate.year.toString()
            )
          });

          return <Agenda_actividades activities={activitiesForSelectedDay} selectedDate={selectedDate} onClose={handleClose} onUpdateFetch={updateFetchFunction}/>
          } catch (error) {
            showToast(error.message, "error", "top")
          }
        } else {
            return null;
        }
    }
    
    return(
        <div className={styles.agenda_container}>
            <div className={` ${styles.agenda_app_container} ${isInvisible ? styles.agenda_app_container_hidden : ''}`}>
              <div className={styles.agenda_close_button_div}>
                <h2> </h2>
                <button className={styles.agenda_close_button} onClick={onClose}></button>
              </div>
                <div className={styles.agenda_app_header}>
                    <button className={styles.agenda_changemonth_button} onClick={goToPreviousMonth}>&lt;</button>
                    <h1 className={styles.agenda_date_text}>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h1>
                    <button className={styles.agenda_changemonth_button} onClick={goToNextMonth}>&gt;</button>
                </div>
                <div className={styles.agenda_weekdays}>
                    {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((day) => (
                    <p key={day} className={styles.agenda_weekday}>
                        {isMobile ? day[0].toUpperCase() : day}
                    </p>
                    ))}
                </div>
                <div className={styles.agenda_calendar_grid}>
                    {renderCalendar()}
                </div>
            </div>
            {renderComponent()}
            {toast && <Toast {...toast} onClose={() => setToast(null)}/>}
        </div>
    );
};