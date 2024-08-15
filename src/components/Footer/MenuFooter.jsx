import Styles from './MenuFooter.module.css'
import windows from './windows.png'
import volume from './volume.png'
import { useEffect, useState } from 'react';

const MenuFooter = () => {

    const [currentTime, setCurrentTime] = useState('');

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
    }, []);

    return (
        <div className={Styles.toolBar}>
            <button className={Styles.start}><img src={windows} className={Styles.img} alt="Logo Windows" />Start</button>
            <div className={Styles.controls}>
                <img src={volume} className={Styles.imgV} alt="icono volumen" />
                <p>{currentTime}</p>
            </div>
        </div>
    )
}

export default MenuFooter;