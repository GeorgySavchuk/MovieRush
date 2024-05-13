import homepage from '../../assets/img.webp'
import styles from './styles.module.css'
import {useEffect, useRef, useState} from "react";
import {MovieSlider} from "../../widgets/movie-slider";
import {
    useLazyGetFantasyFilmsQuery,
    useLazyGetFilmsForFamilyQuery,
    useLazyGetLatestFilmsQuery,
    useLazyGetTopFilmsQuery
} from "../../shared/api";
export const HomePage = () => {
    const aboutRef = useRef<HTMLDivElement>(null)
    const [isBackdropLoaded, setIsBackdropLoaded] = useState<boolean>(false)
    const [fetchLatestFilms, {data: latestFilms, isLoading: isLatestFilmsLoading}] = useLazyGetLatestFilmsQuery()
    const [fetchTopFilms, {data: topFilms, isLoading: isTopFilmsLoading}] = useLazyGetTopFilmsQuery()
    const [fetchFamilyFilms, {data: familyFilms, isLoading: isFamilyFilmsLoading}] = useLazyGetFilmsForFamilyQuery()
    const [fetchFantasyFilms, {data: fantasyFilms, isLoading: isFantasyFilmsLoading}] = useLazyGetFantasyFilmsQuery()
    useEffect(() => {
        window.scrollTo(0, 0)
        const timeout = setTimeout(() => {
            if (aboutRef.current) {
                aboutRef.current.classList.add(styles.animate)
            }
        }, 300)
        return () => clearTimeout(timeout)
    }, []);

    const fetchFilmsAfterBackdropLoaded = () => {
        setIsBackdropLoaded(true)
        fetchLatestFilms()
        fetchTopFilms()
        fetchFantasyFilms()
        fetchFamilyFilms()
    }
    return (
        <main className={styles.homepage}>
            <div className={styles.intro}>
                <img src={homepage} className={styles.img} alt={"Фон на главной странице"} loading={"eager"} onLoad={fetchFilmsAfterBackdropLoaded}/>
                <div className={styles.about} ref={aboutRef}>
                    <h2 className={styles.title}>Добро пожаловать на MovieRush</h2>
                    <span className={styles.subTitle}>MovieRush — это ваш путеводитель по миру кинематографа, где вы можете открывать, смотреть и обсуждать любимые фильмы</span>
                </div>
            </div>
            {
                isBackdropLoaded && <div className={styles.movieCategories}>
                    <MovieSlider title={'Лучшие фильмы этого года'} movies={latestFilms?.docs} isMoviesLoading={isLatestFilmsLoading}/>
                    <MovieSlider title={'Классика жанра'} movies={topFilms?.docs} isMoviesLoading={isTopFilmsLoading}/>
                    <MovieSlider title={'Фантастика'} movies={fantasyFilms?.docs} isMoviesLoading={isFantasyFilmsLoading}/>
                    <MovieSlider title={'Фильмы для всей семьи'} movies={familyFilms?.docs} isMoviesLoading={isFamilyFilmsLoading}/>
                </div>
            }
        </main>
    );
};
