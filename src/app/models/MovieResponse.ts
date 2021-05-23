import { MovieInfo } from "./MovieInfo";

export interface MovieDataResponse {
    Response: boolean;
    Search: MovieInfo[];
    totalResults: number;
}