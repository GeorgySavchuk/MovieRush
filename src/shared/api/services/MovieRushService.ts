import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Movie, Movies} from "../types.ts";
import {getCurrentYear} from "../../lib";


export const MovieRushApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.kinopoisk.dev/v1.4'
    }),
    endpoints: (builder) => ({
        getLatestFilms: builder.query<Movies, void>({
            query: () =>
                `/movie?page=1&limit=15&selectFields=persons&selectFields=id&selectFields=type&selectFields=typeNumber&selectFields=year&selectFields=rating&selectFields=ageRating&selectFields=movieLength&selectFields=genres&selectFields=countries&selectFields=name&selectFields=description&selectFields=poster&selectFields=persons&selectFields=similarMovies&notNullFields=description&notNullFields=poster.url&notNullFields=name&sortField=rating.imdb&sortType=-1&type=movie&year=${getCurrentYear()}&rating.kp=6-10&countries.name=!Россия&token=${import.meta.env.VITE_X_API_TOKEN}`
        }),
        getTopFilms: builder.query<Movies, void>({
            query: () =>
                `/movie?page=1&limit=30&selectFields=persons&selectFields=id&selectFields=type&selectFields=typeNumber&selectFields=year&selectFields=rating&selectFields=ageRating&selectFields=movieLength&selectFields=genres&selectFields=countries&selectFields=name&selectFields=description&selectFields=poster&selectFields=persons&selectFields=similarMovies&sortField=rating.kp&sortType=-1&type=movie&lists=top250&token=${import.meta.env.VITE_X_API_TOKEN}`
        }),
        getFilmsForFamily: builder.query<Movies, void>({
            query: () =>
                `/movie?page=1&limit=15&selectFields=persons&selectFields=id&selectFields=type&selectFields=typeNumber&selectFields=year&selectFields=rating&selectFields=ageRating&selectFields=movieLength&selectFields=genres&selectFields=countries&selectFields=name&selectFields=description&selectFields=poster&selectFields=persons&selectFields=similarMovies&genres.name=семейный&notNullFields=description&notNullFields=poster.url&notNullFields=name&sortField=votes.kp&sortType=-1&type=movie&rating.kp=6-10&token=${import.meta.env.VITE_X_API_TOKEN}`
        }),
        getFantasyFilms: builder.query<Movies, void>({
            query: () =>
                `/movie?page=1&limit=15&selectFields=persons&selectFields=id&selectFields=type&selectFields=typeNumber&selectFields=year&selectFields=rating&selectFields=ageRating&selectFields=movieLength&selectFields=genres&selectFields=countries&selectFields=name&selectFields=description&selectFields=poster&selectFields=persons&selectFields=similarMovies&genres.name=фантастика&notNullFields=description&notNullFields=poster.url&notNullFields=name&sortField=votes.kp&sortType=-1&type=movie&rating.kp=6-10&token=${import.meta.env.VITE_X_API_TOKEN}`
        }),
        getMovieById: builder.query<Movie, string | number>({
            query: (id: string | number) =>
                `/movie/${id}?token=${import.meta.env.VITE_X_API_TOKEN}`
        })
    })
})
export const {
    useLazyGetLatestFilmsQuery,
    useLazyGetTopFilmsQuery,
    useLazyGetFilmsForFamilyQuery,
    useLazyGetFantasyFilmsQuery,
    useLazyGetMovieByIdQuery
} = MovieRushApi