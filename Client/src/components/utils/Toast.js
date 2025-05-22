import React from 'react'
import styles from './Toast.module.css'
import { Info, TriangleAlert, CircleX, CircleCheck  } from 'lucide-react'

export default function Toast({ message, type = 'info', position = 'topRight' }) {

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



    return (
        <div className={`${styles.toast} ${styles[position]}`}>
            <div className={`${styles[type]}`}>
                <span className={styles.icon}>{renderIcon()}</span>
                <span>{message}</span>
            </div>
            
        </div>
    )
}
