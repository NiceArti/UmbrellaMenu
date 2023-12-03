import Image from 'next/image';
import styles from './Footer.module.scss';
import locationImg from '@/app/img/location.png';
import instagramImg from '@/app/img/instagram.png';
import phoneImg from '@/app/img/phone.png';
import arrowUpImg from '@/app/img/arrow.png';


export default function Footer() {
    return (
        <div className={styles["footer"]}>
            <div className={styles["__header"]}>
                <a href="#upTag" className={styles["__row"]}>
                    <div className={styles["__item"]}>
                        <Image src={arrowUpImg} alt="location"/>
                    </div>
                    <h3>Наверх</h3>
                </a>
            </div>
            <div className={styles["__socials"]}>
                <div className={styles["__row"]}>
                    <div className={styles["__icon"]}>
                        <Image src={locationImg} alt="location"/>
                    </div>
                    <h3 className={styles["__text"]}>
                        20-летия октября, 103
                    </h3>
                </div>

                <div className={`${styles["__row"]} ${styles["mt-10"]}`}>
                    <div className={styles["__icon"]}>
                        <Image src={instagramImg} alt="instagram"/>
                    </div>
                    <a className={styles["__text"]} href='https://instagram.com/umbrella_vrn?igshid=MTk0NTkyODZkYg==' rel='umbrela_vrn' target='_blank'>
                        Umbrella_vrn
                    </a>
                </div>

                <div className={`${styles["__row"]} ${styles["mt-10"]}`}>
                    <div className={styles["__icon"]}>
                        <Image src={phoneImg} alt="phone"/>
                    </div>
                    <h3 className={styles["__text"]}>
                        228 67 58
                    </h3>
                </div>
            </div>
            <div className={styles["__footer"]}>
                <h2>Желаем приятного отдыха!</h2>
            </div>
        </div>
    )
}
