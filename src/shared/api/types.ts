interface Data {
    total: number;
    limit: number;
    page: number;
    pages: number;
}
export interface Movies extends Data{
    docs: Movie[];
}
export interface Movie {
    id: number;
    type: string;
    typeNumber: number;
    year: number;
    rating?: MovieRating;
    ageRating: number;
    movieLength: number;
    genres: {name: string}[];
    countries: {name: string}[];
    name: string;
    description?: string;
    shortDescription?: string;
    poster: MoviePoster;
    backdrop?: MovieBackdrop;
    logo?: MovieLogo;
    persons?: MoviePerson[];
    videos?: { trailers: MovieTrailer[] };
    similarMovies?: SimilarMovie[];
}

export type MovieParams = {
    id: string;
}
interface MovieRating {
    kp: number;
    imdb: number;
    tmdb: number;
}

interface MoviePoster {
    url: string;
    previewUrl: string;
}
interface MovieBackdrop {
    url: string;
    previewUrl: string;
}
interface MovieLogo {
    url: string;
}

export interface MoviePerson {
    id: number;
    name: string;
    enName: string;
    description: string;
    enProfession: string;
    photo: string;
}

export interface MovieTrailer {
    name: string;
    site: string;
    url: string;
}

export interface SimilarMovie {
    id: number;
    name: string;
    type: string;
    poster: MoviePoster;
    rating: MovieRating;
    year: number;
}