import styles from './MenuPosition.module.scss';


export default function MenuPosition(menuPositionProps: MenuPositionProps) {
    const setPositionsAndPrices = () => {
        const generatedPositions = [];

        for (let i = 0; i < menuPositionProps.positions.length; i++) {
            generatedPositions.push(
                <div className={styles["__row"]}>
                    <div className={styles["__col"]}>
                        <h3>{menuPositionProps.positions[i]}</h3>
                    </div>
                    <div className={`${styles["__col"]}`}>
                        <h3 className={styles["price-text"]}>{menuPositionProps.pricing[i]}</h3>
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
                {setPositionsAndPrices()}
            </div>
        </div>
    )
}

type MenuPositionProps = {
    header: string,
    positions: string[],
    pricing: number[],
    tag: string,
}
