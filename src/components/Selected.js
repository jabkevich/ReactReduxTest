import styles from "./styles.module.scss"

const Selected = props=> {
    return (
        <div className={styles.selected}>
            {props.selected ?
                props.selected.map((select, i) => (
                    <div key={i}>{select}</div>
                )) : ""
            }
        </div>
    );
}


export default Selected

