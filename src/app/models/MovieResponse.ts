import { MovieInfo } from "./MovieInfo";

export interface MovieDataResponse {
    Response: string;
    Search: MovieInfo[];
    totalResults: number;
    Error: string;
}