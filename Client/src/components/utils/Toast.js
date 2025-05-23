import React, { useEffect, useState } from 'react'
import styles from './Toast.module.css'
import { Info, TriangleAlert, CircleX, CircleCheck  } from 'lucide-react'

export default function Toast({ message, type = 'info', position = 'topRight', onClose }) {
    const [isExiting, setIsExiting] = useState(false)

    const renderIcon = () => {
        switch (type) {
        case 'error':
            return <CircleX size={20} />;
        case 'warning':
            return <TriangleAlert size={20} />;
        case 'success':
            return <CircleCheck  size={20} />;
        case 'info':
        default:
            return <Info size={20} />;
        }
    };

    useEffect(() => {
    const timer = setTimeout(() => {
        setIsExiting(true)
        setTimeout(onClose, 500) // espera que termine la animación
    }, 3000)

    return () => clearTimeout(timer)
    }, [onClose])



    return (
        <div className={`${isExiting ? styles.slideOutTop : styles.slideInTop} ${styles.toast} ${styles[type]} ${styles[position]}`}>
            <div className={styles.message}>
                <span className={styles.icon}>{renderIcon()}</span>
                <span>{message}</span>
            </div>
            
        </div>
    )
}
