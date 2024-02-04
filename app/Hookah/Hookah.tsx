import Image from 'next/image';
import styles from './Hookah.module.scss';
import unionImg from '../img/union.png';
import hookahImg from '../img/noun-hookah.png';


export default function Hookah() {
    return (
        <div className={styles["hookah-component"]}>
            <div className={styles["__header"]}>
                <h2>Кальяны</h2>
            </div>
            <div className={styles["__about"]}>
                <div className={styles["__row"]}>
                    <div className={`${styles["__col"]} ${styles["w-150"]}`}>
                        <Image src={unionImg} alt='human'/>
                        <Image src={unionImg} alt='human'/>
                        <Image src={unionImg} alt='human'/>
                    </div>
                    
                    <div className={`${styles["__col"]} ${styles["w-50"]}`}>
                        <h3 className={styles["__humans-amount"]}>1-3 <br/> чел.</h3>
                    </div>

                    <div className={`${styles["__col"]} ${styles["w-80"]}`}>
                        <Image src={hookahImg} alt='hookan'/>
                    </div>

                    <div className={styles["__col"]}>
                        <div className={`${styles["__price-list"]} ${styles["h-50"]}`}>
                            <h3 className={styles["__humans-amount"]}>1400</h3>
                        </div>
                    </div>
                </div>
                <div className={styles["__row"]}>
                    <div className={`${styles["__col"]} ${styles["w-150"]}`}>
                            <Image src={unionImg} alt='human' height={36}/>
                            <Image src={unionImg} alt='human' height={36}/>
                            <Image src={unionImg} alt='human' height={36}/>
                            <Image src={unionImg} alt='human' height={36}/>
                            <Image src={unionImg} alt='human' height={36}/>
                            <Image src={unionImg} alt='human' height={36}/>
                    </div>
                    <div className={`${styles["__col"]} ${styles["w-50"]}`}>
                        <h3 className={styles["__humans-amount"]}>4-6 <br/> чел.</h3>
                    </div>

                    <div className={`${styles["__col"]} ${styles["w-80"]}`}>
                        <Image src={hookahImg} alt='hookan'/>
                        <Image src={hookahImg} alt='hookan'/>
                    </div>

                    <div className={styles["__col"]}>
                        <div className={styles["__price-list"]}>
                            <h3 className={styles["__humans-amount"]}>2500</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles["__footer"]}>
                <p>
                    Ограничение времени бронирования стола - 90 мин.<br />
                    Отсчёт времени начинается после подачи кальяна.<br />
                    Курит гость или нет - цена кальяна не меняется.
                </p>
            </div>
        </div>
    )
}
