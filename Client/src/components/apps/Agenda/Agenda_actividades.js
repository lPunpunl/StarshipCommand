import styles from './Agenda_actividades.module.css';
import React, { useState } from 'react';
import { deleteActivity, getActivitiesByDay } from "../../../api/agenda";
import { Formulario_actividades } from './Formulario_actividades';
import { Trash2, Pencil } from 'lucide-react';
import Toast from '../../utils/Toast';
import { motion, AnimatePresence } from "framer-motion";


export const Agenda_actividades = ({ activities, selectedDate, onClose, onUpdateFetch }) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [activityToDelete, setActivityToDelete] = useState(null);
    const [activitiesOn, setActivitiesOn] = useState(activities);
    const [activeComponentCreate, setActiveComponentCreate] = useState(false);
    const [activeComponentEdit, setActiveComponentEdit] = useState(false);
    const [activityToEdit, setACtivityToEdit] = useState(null);
    const [isInvisible, setIsInvisible]= useState(false);

    const [isVisible, setIsVisible] = useState(true);

    const [toast, setToast] = useState(null);
    const showToast = (message, type, position) =>{
        setToast({message, type, position});
    };

    const date = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
    const formattedDate = date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
    });

    const userFromLS = localStorage.getItem('user');
    const token = localStorage.getItem('jwtToken');
    const user_id = localStorage.getItem('_id');

    const handleClose = () =>{
        
        setIsVisible(false);
        setTimeout(() => {
            const now = new Date();
            const horas = now.getHours().toString().padStart(2, '0');     
            const minutos = now.getMinutes().toString().padStart(2, '0'); 
            const segundos = now.getSeconds().toString().padStart(2, '0'); 
            const fullHour = horas + minutos + segundos;
            
            onUpdateFetch(fullHour);
            if (onClose) onClose(); 
        }, 200); 
        
    }

    const handleCreateClick = () =>{
        setActiveComponentCreate(true);
        setIsInvisible(true);
    }

    const handleCreateClose = async () =>{
        setActiveComponentCreate(false)
        setIsInvisible(false);
        try {
            const updatedActivities = await getActivitiesByDay( selectedDate.day, selectedDate.month, selectedDate.year, token, user_id);
            if (updatedActivities === null){
                setActivitiesOn([])
            } else{
                setActivitiesOn(updatedActivities);
            }
        } catch (error) {
            showToast(error.messae, "error", "top");
        }
        
    }

    const renderComponentCreate = () =>{
        if(activeComponentCreate != false){
            return <Formulario_actividades onClose={handleCreateClose} selectedDate={selectedDate} mode="create" />
        }
    }

    const handleEditClick = (activityID) => {
        const foundActivity = activitiesOn.find(activity => activity._id === activityID);
        setACtivityToEdit(foundActivity);
        setActiveComponentEdit(true);
        setIsInvisible(true);
    }

    const handleEditClose = async ()=>{
        setActiveComponentEdit(false);
        setIsInvisible(false);

        try {
            const updatedActivities = await getActivitiesByDay( selectedDate.day, selectedDate.month, selectedDate.year, token, user_id);
            if (updatedActivities === null){
                setActivitiesOn([])
            } else{
                setActivitiesOn(updatedActivities);
            }
        } catch (error) {
            showToast(error.message, "error", "top")
        }
        
    }

    const renderComponentEdit = () =>{
        if(activeComponentEdit != false){
            return <Formulario_actividades onClose={handleEditClose} selectedDate={selectedDate} mode="edit" activityData={activityToEdit}/>
        }
    }

    const handleDelete = (activityID) => {
        setActivityToDelete(activityID);
        setShowConfirmModal(true);
    }

    const confirmDelete = async () => {
        try {
            await deleteActivity(activityToDelete, token);
            const updatedActivities = await getActivitiesByDay( selectedDate.day, selectedDate.month, selectedDate.year, token, user_id);

            if (updatedActivities === null){
                setActivitiesOn([])
            } else{
                setActivitiesOn(updatedActivities);
            }

        } catch (error) {
            showToast(error.message, "error", "top")
        } finally {
            setShowConfirmModal(false);
        }
        };

    return(
        <div>
            <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    key="agenda_actividades"
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={styles.agenda_activities_container}
                >
            <div className={`${styles.agenda_activities_app_container} ${isInvisible ? styles.agenda_activities_app_container_hidden : '' }`}>
                <div className={styles.aa_close_button_div}>
                    <h2> </h2>
                    <button className={styles.aa_close_button} onClick={handleClose}></button>
                </div>
                <h1 className={styles.aa_selected_date}>{formattedDate}</h1>
                <div className={styles.aa_create_button_div}>
                    <h1> </h1>
                    <button className={styles.aa_create_button} onClick={handleCreateClick}>Crear</button>
                </div>
                <div className={styles.aa_activities_container}>
                {activitiesOn.length === 0 ? (
                    <div className={styles.aa_no_activities_message}>
                        <h3>
                            No hay actividades para este día.
                        </h3>
                    </div>
                    
                ) : (
                    <ul className={styles.aa_activities_list}>
                        {activitiesOn
                        .slice()
                        .sort((a,b) => a.time.localeCompare(b.time))
                        .map(activity => (
                            <div key={activity._id} className={styles.aa_activity_item_white_row}>
                                <li key={activity._id} className={styles.aa_activity_item}>
                                    
                                    <p className={styles.aa_activity_time}>{activity.time}</p>
                                    {/*<p className={styles.aa_activity_separation}>|</p>*/}
                                    
                                    
                                    <p className={styles.aa_activity_description}>{activity.description}</p>
                                    
                                    
                                    <div className={styles.aa_activity_actions}>
                                        <button 
                                            className={styles.aa_edit_button}
                                            onClick={() => handleEditClick(activity._id)}  
                                        >
                                            <Pencil size={18}/>
                                        </button>
                                        <button
                                            className={styles.aa_delete_button}
                                            onClick={() => handleDelete(activity._id)}
                                        >
                                            <Trash2 size={18}/>
                                        </button>
                                    </div>
                                </li>
                                {activityToDelete === activity._id && showConfirmModal &&(
                                    <li className={styles.aa_activity_confirm_delete_div}>
                                        <p className={styles.aa_activity_confirm_delete_text}>¿Eliminar actividad?</p>
                                        <div className={styles.aa_confirm_delete_actions}>
                                            <button className={styles.aa_cancel_delete_button} onClick={() => {setShowConfirmModal(false); setActivityToDelete(null)}}>Cancelar</button>
                                            <button className={styles.aa_confirm_delete_button} onClick={confirmDelete}>Eliminar</button>
                                        </div>
                                    </li>
                                )}
                            </div>
                        ))}
                    </ul>
                    )}
                </div>
            </div>
            {toast && <Toast {...toast} onClose={() => setToast(null)}/>}
        </motion.div>
        )}
</AnimatePresence>
        
            {renderComponentCreate()}
            {renderComponentEdit()}
        </div>
    );
};