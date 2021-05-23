import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieDetailResponse } from '../models/MovieDetailResponse';
import { MovieDataResponse } from '../models/MovieResponse';
import { CacheService } from './cache.service';

// These should be maintained in a secured location, putting this here just as
// this is a test project.
const OMDB_API_KEY = '4897472c';
const BASE_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

@Injectable({
    providedIn: 'root'
})
export class LoadService {

    constructor(private httpClient: HttpClient, private cacheService: CacheService) { }

    // we use the below property to update our banner.
    public lastThrownError: string = '';

    public searchMovie(searchTerm: string): void {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('s', searchTerm);
        httpParams = httpParams.append('page', 1);
        this.fetchMovieData(httpParams, false);
    }

    public loadPage(pageNumber: number): void {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('s', this.cacheService.searchTerm);
        httpParams = httpParams.append('page', pageNumber);
        this.fetchMovieData(httpParams, true);
    }

    public searchMovieFull(movieId: string): void {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('i', movieId);
        httpParams = httpParams.append('plot', 'full');
        this.fetchMovieDetail(httpParams,);
    }

    private fetchMovieData(httpParams: HttpParams, isPageLoad: boolean): void {
        this.httpClient.get<MovieDataResponse>(BASE_URL, {params: httpParams}).subscribe(
            (movieResponse: MovieDataResponse) => {
                console.log(movieResponse);
                this.cacheService.loadMovieData(movieResponse, isPageLoad);
                if (!movieResponse) {
                    console.warn('invalid response');
                    this.lastThrownError = 'invalid response data';
                    return;
                }
                if (movieResponse.Response === 'False') {
                    this.lastThrownError = movieResponse.Error;
                    return;
                }
                this.lastThrownError = '';
            },
            (err) => {
                console.error('fetch movie data error, ', err);
                this.lastThrownError = err.Error;
            },
        );
    }

    private fetchMovieDetail(httpParams: HttpParams): void {
        this.httpClient.get<MovieDetailResponse>(BASE_URL, {params: httpParams}).subscribe(
            (movieResponse: MovieDetailResponse) => {
                console.log(movieResponse);
                this.cacheService.loadMovieDetail(movieResponse);
                if (!movieResponse) {
                    console.warn('invalid response');
                    this.lastThrownError = 'invalid response data';
                    return;
                }
                if (movieResponse.Response === 'False') {
                    this.lastThrownError = movieResponse.Error;
                    return;
                }
                this.lastThrownError = '';
            },
            (err) => {
                console.error('fetch movie details error, ', err);
                this.lastThrownError = err.Error;
            },
        );
    }


}
