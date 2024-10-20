import Image from 'next/image';
import styles from './Hookah.module.scss';
import { UnionAsset, HookahAsset } from '@/shared/images';
import { Title } from '@/shared/ui';


export default function Hookah() {
    return (
        <div className={styles["hookah-component"]}>
            <Title title='Кальяны'/>

            <div className={styles["__about"]}>
                <div className={styles["__row"]}>
                    <div className={`${styles["__col"]} ${styles["w-150"]}`}>
                        <Image src={UnionAsset} alt='human'/>
                        <Image src={UnionAsset} alt='human'/>
                        <Image src={UnionAsset} alt='human'/>
                    </div>
                    
                    <div className={`${styles["__col"]} ${styles["w-50"]}`}>
                        <h3 className={styles["__humans-amount"]}>1-3 <br/> чел.</h3>
                    </div>

                    <div className={`${styles["__col"]} ${styles["w-80"]}`}>
                        <Image src={HookahAsset} alt='hookan'/>
                    </div>

                    <div className={styles["__col"]}>
                        <div className={`${styles["__price-list"]} ${styles["h-50"]}`}>
                            <h3 className={styles["__humans-amount"]}>1500</h3>
                        </div>
                    </div>
                </div>
                <div className={styles["__row"]}>
                    <div className={`${styles["__col"]} ${styles["w-150"]}`}>
                            <Image src={UnionAsset} alt='human' height={36}/>
                            <Image src={UnionAsset} alt='human' height={36}/>
                            <Image src={UnionAsset} alt='human' height={36}/>
                            <Image src={UnionAsset} alt='human' height={36}/>
                            <Image src={UnionAsset} alt='human' height={36}/>
                            <Image src={UnionAsset} alt='human' height={36}/>
                    </div>
                    <div className={`${styles["__col"]} ${styles["w-50"]}`}>
                        <h3 className={styles["__humans-amount"]}>4-6 <br/> чел.</h3>
                    </div>

                    <div className={`${styles["__col"]} ${styles["w-80"]}`}>
                        <Image src={HookahAsset} alt='hookan'/>
                        <Image src={HookahAsset} alt='hookan'/>
                    </div>

                    <div className={styles["__col"]}>
                        <div className={styles["__price-list"]}>
                            <h3 className={styles["__humans-amount"]}>2700</h3>
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
