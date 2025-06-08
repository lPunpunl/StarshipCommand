import styles from './GastosDiarios.module.css';
import Toast from '../../utils/Toast';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

export const GastosDiarios = ({ onClose }) =>{
    const [isVisible, setIsVisible] = useState(true);

    const [toast, setToast] = useState(null);
        const showToast = (message, type, position) =>{
            setToast({message, type, position});
        };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                onClose();
            }, 200);
        }, 3000)
    
        return () => clearTimeout(timer)
        }, [onClose])
    

    
    
    return(
        <div>

        <AnimatePresence mode="wait">

            {isVisible && (
                <motion.div
                    key="gastosdiarios"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className={styles.gastos_diarios_container}
                >
                    <div className={styles.gastos_diarios_app_container}>
                        <div className={styles.gastos_diarios_in_development_message}>
                            <h3>Próximamente: aplicación de gastos diarios</h3>
                        </div>
                    </div>
                
                    {toast && <Toast {...toast} onClose={() => setToast(null)}/>}
                </motion.div>
            )}
            
        </AnimatePresence>
            
        </div>
    );
};