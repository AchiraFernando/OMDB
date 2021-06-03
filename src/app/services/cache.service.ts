import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MovieDetail } from '../models/MovieDetail';
import { MovieDetailResponse } from '../models/MovieDetailResponse';
import { MovieInfo } from '../models/MovieInfo';
import { MovieDataResponse } from '../models/MovieResponse';

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    // here we store a list of movie infos per page.
    public pageBaseMovieData: { [pageNumber: number]: MovieInfo[] } = {};
    // here we store the currently vieweing movie's detail.
    public movieDetailData: { [movieId: string]: MovieDetail } = {};

    public searchTerm: string = '';
    public pageNumber: number = 1;
    public totalMovies: number = 0;

    private _movieDataChanged: Subject<MovieInfo[]> = new Subject();
    // event raised when new movie data gets loaded or updated.
    public movieDataChanged: Observable<MovieInfo[]> = this._movieDataChanged.asObservable();

    private _movieDetailsChanged: Subject<MovieInfo[]> = new Subject();
    // event raised when new movie details data gets loaded or updated.
    public movieDetailsChanged: Observable<MovieInfo[]> = this._movieDetailsChanged.asObservable();

    constructor() { }

    public getMovieData(): MovieInfo[] {
        return this.pageBaseMovieData[this.pageNumber];
    }

    public loadMovieData(movieDataResponse: MovieDataResponse, isPageLoad: boolean): void {
        let movieData: MovieInfo[] = movieDataResponse.Search;
        this.totalMovies = movieDataResponse.totalResults;

        if (isPageLoad) {
            this.pageBaseMovieData[this.pageNumber] = movieData;
        } else {
            this.pageBaseMovieData = {};
            this.pageNumber = 1;
            this.pageBaseMovieData[this.pageNumber] = movieData;
        }

        this._movieDataChanged.next();
    }

    public loadMovieDetail(movieDetailResponse: MovieDetailResponse): void {
        let movieDetail: MovieDetail = {} as MovieDetail;
        movieDetail.imdbID = movieDetailResponse.imdbID;
        movieDetail.title = movieDetailResponse.Title;
        movieDetail.year = movieDetailResponse.Year;
        movieDetail.plot = movieDetailResponse.Plot;
        movieDetail.actors = movieDetailResponse.Actors;
        movieDetail.ratings = movieDetailResponse.Ratings;
        this.movieDetailData[movieDetailResponse.imdbID] = movieDetail;

        this._movieDetailsChanged.next();
    }

    public getMovieDetailForId(movieId: string): MovieDetail {
        let movieDetail = this.movieDetailData[movieId];
        return movieDetail;
    }

    public isPageLoaded(pageNumber: number): boolean {
        let loadedPages = Object.keys(this.pageBaseMovieData);
        return loadedPages.includes(pageNumber.toString());
    }

    // tigger data changed event to load the page with cached data.
    public triggerPageLoad(): void {
        this._movieDataChanged.next();
    }

    public clearCache(): void {
        this.movieDetailData = {};
        this.totalMovies = 0;
        this._movieDetailsChanged.next();

        this.pageBaseMovieData = {}
        this._movieDataChanged.next();
    }
}
