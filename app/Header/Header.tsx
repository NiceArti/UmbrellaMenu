import Image from 'next/image';
import { Advent_Pro } from 'next/font/google';

import styles from './Header.module.scss';
import logo from '../img/logo.png';


// Subsets are really important. CHECK BELOW FOR MORE INFO
const adventPro = Advent_Pro({ 
    subsets: ['latin'],
    style: 'normal',
    weight: '700',
});

export default function Header() {
    return (
        <div className={styles["menu"]}>
            <Image src={logo} alt="Umbrella Logo"/>

            <div className={styles["__menu-text"]} id="upTag">
                <h1 className={`${styles["__text"]} ${adventPro.className}`}>Меню</h1>
            </div>

            <div className={styles["__btn-group"]}>
                <div className={styles["__row"]}>
                    <a className={`${styles["btn"]} ${styles["__item"]}`} href='#coffeTag'>Кофе</a>
                    <a className={`${styles["btn"]} ${styles["__item"]}`} href='#lemonadeTag'>Лимонады</a>
                    <a className={`${styles["btn"]} ${styles["__item"]}`} href='#teaTag'>Чай</a>
                </div>
                <div className={styles["__row"]}>
                    <a className={`${styles["btn"]} ${styles["__item"]}`} href='#milkshakeTag'>Милкшейки</a>
                    <a className={`${styles["btn"]} ${styles["__item"]}`} href='#snacksTag'>Снеки</a>
                    <a className={`${styles["btn"]} ${styles["__item"]}`} href='#beerTag'>Пиво</a>
                </div>
            </div>
        </div>
    )
}
