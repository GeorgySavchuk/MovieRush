import styles from './styles.module.css'
import {CircularProgress} from "@mui/material";

export const Loader = () => {
    return (
        <div className={styles.loader}>
            <CircularProgress size={40} color={"inherit"}/>
        </div>
    );
};
