import styles from './Footer.module.css'
import { useEffect, useContext } from 'react'
import { ToDoContext } from '../../Context/ToDoContext'
import windows from '../../assets/windows.png'
import volume from '../../assets/volume.png'

const Footer = () => {

    const { currentTime,
        setCurrentTime } = useContext(ToDoContext);


    useEffect(() => {
        const updateTime = () => {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            setCurrentTime(`${formattedHours}:${formattedMinutes}${ampm}`);
        };
        updateTime();

        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, [])
    return (
        <div className={styles.toolBar}>
            <button className={styles.start}><img src={windows} className={styles.img} alt="Logo Windows" />Start</button>
            <div className={styles.controls}>
                <img src={volume} className={styles.imgV} alt="icono volumen" />
                <p>{currentTime}</p>
            </div>
        </div>
    )
}

export default Footer;