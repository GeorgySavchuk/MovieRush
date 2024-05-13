import styles from './styles.module.css'
import {FC, useEffect, useMemo, useRef, useState} from "react";
import {Movie, SimilarMovie} from "../../shared/api/types.ts";
import {Loader} from "../../shared/ui";
import {MovieCard} from "../../entities/movie-card";
import {FaArrowLeftLong, FaArrowRightLong} from "react-icons/fa6";
interface MovieSliderProps {
    title: string;
    movies: Movie[] | SimilarMovie[] | undefined;
    isMoviesLoading: boolean;
}
export const MovieSlider: FC<MovieSliderProps> = ({title, movies, isMoviesLoading}) => {
    const sliderRef = useRef<HTMLDivElement>(null)
    const movieRef = useRef<HTMLAnchorElement>(null)
    const [scrollCount, setScrollCount] = useState<number>(0)
    const [showScrollButtons, setShowScrollButtons] = useState<boolean>(true)
    const scrollMoviesToRight = () => {
        if (sliderRef.current && movieRef.current && !isRightScrollBtnDisabled) {
            sliderRef.current.scrollLeft += movieRef.current.getBoundingClientRect().width + 16;
            setScrollCount(scrollCount => scrollCount + 1)
        }
    }

    const scrollMoviesToLeft = () => {
        if (sliderRef.current && movieRef.current && scrollCount !== 0) {
            sliderRef.current.scrollLeft -= movieRef.current.getBoundingClientRect().width + 16;
            setScrollCount(scrollCount => scrollCount - 1)
        }
    }

    const isRightScrollBtnDisabled = useMemo(() => {
        if (sliderRef.current && movieRef.current && movies !== undefined) {
            const viewportWidth = sliderRef.current.clientWidth;
            const movieWidth = movieRef.current.offsetWidth;
            const visibleItems = Math.floor(viewportWidth / movieWidth);
            return scrollCount === movies.length - visibleItems;
        }
        return false
    }, [scrollCount])

    const checkIfScrollingNeeded = () => {
        if (sliderRef.current && movieRef.current && movies) {
            const allMoviesWidth = movieRef.current.offsetWidth * movies.length
            const allGaps = 16 * (movies.length - 1)
            const allMoviesFit = allMoviesWidth + allGaps <= sliderRef.current.offsetWidth;
            setShowScrollButtons(!allMoviesFit);
        }
    };

    useEffect(() => {
        checkIfScrollingNeeded();
        window.addEventListener('resize', checkIfScrollingNeeded);
        return () => window.removeEventListener('resize', checkIfScrollingNeeded);
    }, [movies]);


    if ((movies === undefined || movies.length === 0) && !isMoviesLoading) {
        return null
    }
    return (
        <div className={styles.movieSliderContainer}>
            <div className={styles.sliderHeader}>
                <h2>{title}</h2>
                {
                    !isMoviesLoading && showScrollButtons &&
                    <div className={styles.scrollBtns}>
                        <FaArrowLeftLong size={25} onClick={scrollMoviesToLeft} className={`${scrollCount === 0 ? styles.disabled : ''}`}/>
                        <FaArrowRightLong size={25} onClick={scrollMoviesToRight} className={`${isRightScrollBtnDisabled ? styles.disabled : ''}`}/>
                    </div>
                }
            </div>
            <div className={`${styles.slider} ${isMoviesLoading ? styles.isLoading : ''}`}>
                {
                    isMoviesLoading
                        ? <Loader/>
                        : <div className={styles.movieList} ref={sliderRef}>
                            {(movies as Movie[]).map((movie) => (
                                <MovieCard movie={movie} key={movie.id} ref={movieRef}/>
                            ))}
                        </div>
                }
            </div>
        </div>
    );
};
