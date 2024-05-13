import styles from './styles.module.css'
import {Link, useParams} from "react-router-dom";
import {MovieParams} from "../../shared/api/types.ts";
import {useLazyGetMovieByIdQuery} from "../../shared/api";
import {useEffect} from "react";
import {Loader} from "../../shared/ui";
import {MovieInfo} from "../../widgets/movie-info";
import {SimilarMovies} from "../../widgets/similar-movies";
import {useAppDispatch, useAppSelector} from "../../shared/lib";
import {setSimilarMovieLoading} from "../../shared/model";

export const MoviePage = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams<MovieParams>()
    const {isSimilarMovieLoading} = useAppSelector(state => state.movieReducer)
    const [fetchMovie, {data: movie, isLoading, isError}] = useLazyGetMovieByIdQuery()
    useEffect(() => {
        fetchMovie(id as string)
        window.scrollTo(0, 0)
    }, [id]);
    useEffect(() => {
        if (movie) {
            dispatch(setSimilarMovieLoading(false))
        }
    }, [movie]);
    return (
        <div className={styles.moviePage}>
            <header>
                <Link to={'/'} className={styles.headerTitle}>
                    <h2>
                        MovieRush
                    </h2>
                </Link>
            </header>
           <main className={`${isLoading || isSimilarMovieLoading || isError ? styles.centerContent : ''}`}>
               {
                   isLoading || isSimilarMovieLoading
                       ? <Loader/>
                       : movie !== undefined && <>
                           <MovieInfo movie={movie}/>
                           <SimilarMovies similarMovies={movie.similarMovies ?? []}/>
                       </>

               }
               {
                   isError && <span>К сожалению страница этого фильма не доступна</span>
               }
           </main>
        </div>
    );
};
