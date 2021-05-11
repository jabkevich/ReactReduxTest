import styles from "./styles.module.scss"

const Selected = props=> {
    return (
        <div className={styles.selected}>
            {props.selected}
        </div>
    );
}


export default Selected

