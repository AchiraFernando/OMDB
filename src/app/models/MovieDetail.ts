import { MovieRating } from "./MovieRating";

export interface MovieDetail {
    imdbID: string;
    title: string;
    year: string;
    plot: string
    actors: string;
    ratings: MovieRating[];
}