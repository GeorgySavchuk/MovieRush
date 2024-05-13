import {forwardRef} from 'react';
import {Movie, SimilarMovie} from "../../shared/api/types.ts";
import styles from './styles.module.css'
import {printMovieDuration, useAppDispatch} from "../../shared/lib";
import {Link} from "react-router-dom";
import {MovieRating} from "../../shared/ui/movie-rating";
import {setSimilarMovieLoading} from "../../shared/model";

interface MovieCardProps {
    movie: Movie | SimilarMovie;
}

export const MovieCard = forwardRef<HTMLAnchorElement, MovieCardProps>(({movie}, ref) => {
    const dispatch = useAppDispatch()
    const setPageLoading = () => {
        dispatch(setSimilarMovieLoading(true))
    }
    return (
        <Link to={`/movie/${movie.id}`} className={styles.movieCard} ref={ref} onClick={setPageLoading}>
            <img src={movie.poster.url} alt={`Постер фильма ${movie.name}`}/>
            <div className={styles.content}>
                {
                    movie.rating && <MovieRating rating={movie.rating.kp}/>
                }
                <span className={styles.movieNameAndYear}>
                    {
                        movie.name && <span>{movie.name}</span>
                    }
                    {
                        movie.name && movie.year && <span>{`(${movie.year})`}</span>
                    }
                </span>
                {
                    "movieLength" in movie && <div className={styles.movieDuration}>
                        <span>{printMovieDuration(movie.movieLength)}</span>
                    </div>
                }
            </div>
        </Link>
    );
});
