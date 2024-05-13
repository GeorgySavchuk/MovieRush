import styles from './styles.module.css'
import {Movie, MoviePerson} from "../../shared/api/types.ts";
import {FC} from "react";
import {printMovieDuration} from "../../shared/lib";
import {MovieRating} from "../../shared/ui/movie-rating";
interface MovieInfoProps {
    movie: Movie;
}
export const MovieInfo: FC<MovieInfoProps> = ({movie}) => {

    const printDirector = (persons: MoviePerson[]): string => {
        let director: string = ""
        persons.forEach((person) =>  {
            if (person.enProfession === 'director') {
                director = person.name
            }
        })
        return director
    }
    const printActors = (persons: MoviePerson[]): string => {
        const actors: MoviePerson[] = persons.slice(0, 4);
        return actors.reduce((acc, actor, index) => {
            return index === 0
                ? acc += actor.name
                : acc += `, ${actor.name}`
        }, '')
    }

    return (
        <div className={styles.movieInfo}>
            <div className={styles.mainInfo}>
                <h2>{movie.name}</h2>
                <div className={styles.mainProps}>
                    {
                        movie.rating.kp && <MovieRating rating={movie.rating.kp}/>
                    }
                    {
                        movie.year && <span className={styles.movieYear}>
                            {movie.year}
                        </span>
                    }
                    {
                        movie.genres && <span className={styles.movieGenre}>
                            {movie.genres[0].name}
                        </span>
                    }
                    <span className={styles.movieAgeRating}>
                        {movie.ageRating ? `${movie.ageRating}+` : '16+'}
                    </span>
                    {
                        movie.countries && <span className={styles.movieCountry}>
                            {movie.countries[0].name}
                        </span>
                    }
                    {
                        movie.movieLength && <span className={styles.movieDuration}>
                            {printMovieDuration(movie.movieLength)}
                        </span>
                    }
                </div>
                <p>{movie.description}</p>
                {
                    movie.persons && <div className={styles.movieCast}>
                        <div className={styles.director}>
                            <span>{"Режиссер: "}</span>
                            <span>{printDirector(movie.persons)}</span>
                        </div>
                        <div className={styles.actors}>
                            <span>{"Актеры: "}</span>
                            <span>{printActors(movie.persons)}</span>
                        </div>
                    </div>
                }
            </div>
            <div className={styles.moviePoster}>
                <img src={movie.poster.url} alt={`Постер ${movie.name}`}/>
            </div>
        </div>
    );
};
