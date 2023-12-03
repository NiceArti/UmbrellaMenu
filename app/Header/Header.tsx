"use client"
import Image from 'next/image';
import {Advent_Pro} from 'next/font/google';

import styles from './Header.module.scss';
import logo from '../img/logo.png';


// Subsets are really important. CHECK BELOW FOR MORE INFO
const adventPro = Advent_Pro({
    subsets: ['latin'],
    style: 'normal',
    weight: '700',
});

function scrollToId(id: string) {
    // document.getElementById(id).scrollIntoView({behavior: 'smooth'});
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({behavior: 'smooth'});
    }
}

export default function Header() {
    return (
        <div className={styles["menu"]}>
            <Image src={logo} alt="Umbrella Logo"/>

            <div className={styles["__menu-text"]} id="upTag">
                <h1 className={`${styles["__text"]} ${adventPro.className}`}>Меню</h1>
            </div>

            <div className={styles["__btn-group"]}>
                <div className={styles["__row"]}>
                    <button className={`${styles["btn"]} ${styles["__item"]}`} onClick={() => {
                        scrollToId("coffeTag");
                    }
                    }>Кофе
                    </button>
                    <button className={`${styles["btn"]} ${styles["__item"]}`} onClick={() => {
                        scrollToId("lemonadeTag")
                    }
                    }>Лимонады
                    </button>
                    <button className={`${styles["btn"]} ${styles["__item"]}`} onClick={() => {
                        scrollToId("teaTag")
                    }}>Чай
                    </button>
                </div>
                <div className={styles["__row"]}>
                    <button className={`${styles["btn"]} ${styles["__item"]}`} onClick={() => {
                        scrollToId("milkshakeTag")
                    }}>Милкшейки
                    </button>
                    <button className={`${styles["btn"]} ${styles["__item"]}`} onClick={() => {
                        scrollToId("snacksTag")
                    }}>Снеки
                    </button>
                    <button className={`${styles["btn"]} ${styles["__item"]}`} onClick={() => {
                        scrollToId("beerTag")
                    }}>Пиво
                    </button>
                </div>
            </div>
        </div>
    )
}
