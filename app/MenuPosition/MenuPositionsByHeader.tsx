import styles from './MenuPosition.module.scss';


export default function MenuPositionsByHeader(menuPositionProps: MenuPositionProps) {

    return (
        <div className={styles["menu-position"]}>
            
            <div className={styles["__group"]}>
                <div className={styles["__row"]}>
                    <div className={styles["__header-one"]}>
                        <h2>{menuPositionProps.header}</h2>
                    </div>
                    <h3 className={styles["price-text"]}>{menuPositionProps.pricing}</h3>
                </div>
            </div>
        </div>
    )
}

type MenuPositionProps = {
    header: string,
    pricing: number,
}
