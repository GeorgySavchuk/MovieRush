import {FC, ReactElement} from 'react';
import {createPortal} from "react-dom";
import {Modal} from "@mui/material";
import styles from './styles.module.css'
interface OverlayProps {
    children: ReactElement;
    isOpen: boolean;
}
export const Overlay: FC<OverlayProps> = ({children, isOpen}) => {
    return createPortal(
        <Modal
            open={isOpen}
            className={styles.modal}
        >
            {children}
        </Modal>,
        document.body
    )
};
