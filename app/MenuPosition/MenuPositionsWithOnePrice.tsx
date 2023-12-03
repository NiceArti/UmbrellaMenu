import styles from './MenuPosition.module.scss';


export default function MenuPositionsWithOnePrice(menuPositionProps: MenuPositionProps) {
    const setPositions = () => {
        const generatedPositions = [];

        for (let i = 0; i < menuPositionProps.positions.length; i++) {
            generatedPositions.push(
                <div className={styles["__row"]}>
                    <div className={styles["__col"]}>
                        <h3>{menuPositionProps.positions[i]}</h3>
                    </div>
                </div>
            );
        }

        return generatedPositions;
    }
    
    return (
        <div className={styles["menu-position"]} id={menuPositionProps.tag}>
            <div className={styles["__header"]}>
                <h2>{menuPositionProps.header}</h2>
            </div>
            <div className={styles["__group"]}>
                <div className={styles["__super-row"]}>
                    <div className={`${styles["__col"]}`}>
                        {setPositions()}
                    </div>
                    
                    <div className={`${styles["__super-col"]}`}>
                        <h3 className={styles["price-text"]}>{menuPositionProps.pricing}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

type MenuPositionProps = {
    header: string,
    positions: string[],
    pricing: number,
    tag: string,
}
