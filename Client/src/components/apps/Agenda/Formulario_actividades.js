import styles from './Formulario_actividades.module.css'
import React, { useState, useEffect } from 'react';
import { updateActivity , createActivity } from '../../../api/agenda'
import Select from 'react-select'

export const Formulario_actividades = ({ onClose, selectedDate, mode="create", activityData=null  }) => {
    const [hour, setHour] = useState('08');
    const [minutes, setMinutes] = useState('00');
    const [description, setDescription] = useState('');

    const userFromLS = localStorage.getItem('user');
    const token = localStorage.getItem('jwtToken');
    const user_id = localStorage.getItem('_id');

    const date = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day); // mes va de 0 a 11
    const formattedDate = date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
    });

    //carga de datos si esta en modo edicion
    useEffect(() => {
        if (mode === "edit" && activityData) {
          const [h, m] = activityData.time.split(':');
          setHour(h);
          setMinutes(m);
          setDescription(activityData.description);
        }
      }, [mode, activityData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const time = `${hour}:${minutes}`

        if(mode === "create"){
            try {
                await createActivity( time, selectedDate.day, selectedDate.month, selectedDate.year, description, token, user_id)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await updateActivity(activityData._id, time, description, token)
            } catch (error) {
                console.log(error)
            }
        }
        onClose(); // Cierra el modal después de enviar
      };
    

      const hourOptions = Array.from({ length: 24 }, (_, i) => ({
        value: String(i).padStart(2, '0'),
        label: String(i).padStart(2, '0')
      }));
      
      const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
        value: String(i).padStart(2, '0'),
        label: String(i).padStart(2, '0')
      }));

      const customStyles = {
        control: (base) => ({
          ...base,
          backgroundColor: 'transparent',
          color: '#E6E6E6',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '6px',
          boxShadow: 'none',
          ':hover': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
            backgroundColor: '#2e1f33'
          },
        }),
        singleValue: (base) => ({
          ...base,
          color: '#E6E6E6',
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: '#221726',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? '#322238' : '#221726',
          color: '#E6E6E6',
          cursor: 'pointer',
          ':active': {
            backgroundColor: '#444',
          },
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: '#E6E6E6',
          padding: '1px',
        }),
        indicatorsContainer: () => ({
            padding: '0px 4px',
            alignItems: 'center',
        }),
        indicatorSeparator: () => ({
          display: 'none',
          
        }),
        input: (base) => ({
          ...base,
          color: '#E6E6E6',
        }),
      };
    
    return (
        <div className={styles.formulario_actividades_container}>
            <div className={styles.formulario_actividades_app_container}>
                <div className={styles.fa_close_button_div}>
                    <h1></h1>
                    <button className={styles.fa_close_button} onClick={onClose}></button>
                </div>
                <h2 className={styles.fa_selected_date}>{formattedDate}</h2>
                <h3 className={styles.fa_activity_option}>{mode === "create" ? 'Crear actividad' : 'Editar actividad'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className={styles.fa_form_group}>

                        <div className={styles.fa_time_selectors}>
                            <Select 
                                options={hourOptions}
                                onChange={(selected)=> setHour(selected.value)}
                                value={hourOptions.find(opt => opt.value === hour)}
                                styles={customStyles}
                            />
                            <span style={{color: '#E6E6E6'}}>:</span>
                            <Select 
                                options={minuteOptions}
                                onChange={(selected)=> setMinutes(selected.value)}
                                value={minuteOptions.find(opt => opt.value === minutes)}
                                styles={customStyles}
                            />
                        </div>

                    </div>

                    <div className={styles.fa_form_group}>
                        <input
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className={styles.fa_description_input}
                        placeholder="Descripción..."
                        />
                    </div>

                    <button type="submit" className={styles.fa_submit_button}>
                        {mode === "create" ? 'Guardar' : 'Guardar'}
                    </button>
                </form>



            </div>
        </div>
    );
}

