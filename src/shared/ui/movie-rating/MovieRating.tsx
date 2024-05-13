import {FC} from "react";
import styles from './styles.module.css'
interface MovieRatingProps {
    rating: number;
}

export const MovieRating: FC<MovieRatingProps> = ({rating}) => {
    return (
        <div className={styles.movieRating}>
            {rating.toFixed(1)}
        </div>
    );
};
