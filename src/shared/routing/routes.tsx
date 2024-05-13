import {createBrowserRouter} from "react-router-dom";
import {HomePage} from "../../pages/home-page";
import {MoviePage} from "../../pages/movie-page";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>,
    },
    {
        path: '/movie/:id',
        element: <MoviePage/>
    }
])
