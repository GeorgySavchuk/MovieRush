import {SimilarMovie} from "../../shared/api/types.ts";
import {FC} from "react";
import styles from './styles.module.css'
import {MovieSlider} from "../movie-slider";
interface SimilarMoviesProps {
    similarMovies: SimilarMovie[]
}

export const SimilarMovies: FC<SimilarMoviesProps> = ({similarMovies}) => {
    return (
        <div className={styles.similarMovies}>
            <MovieSlider title={'Похожее'} movies={similarMovies} isMoviesLoading={false}/>
        </div>
    );
};
