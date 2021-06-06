import { Component, HostListener, OnInit } from '@angular/core';
import { MovieDetail } from 'src/app/models/MovieDetail';
import { MovieInfo } from 'src/app/models/MovieInfo';
import { CacheService } from 'src/app/services/cache.service';
import { LoadService } from 'src/app/services/load.service';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
    // we use below code snippet the check the device screen size.
    private scrWidth: number = window.innerWidth;
    @HostListener('window:resize', ['$event'])
    getScreenSize(): void {
        // reset data
        this.resetMovieData();
        this.scrWidth = window.innerWidth;
    }
    public get isMobileScreenSize(): boolean {
        if (this.scrWidth < 800) return true;
        return false;
    }

    // data that is used to build and maintain the css-grid movie cards
    public movieInfo: MovieInfo[] = [];
    // unmutated, original data from the cache service - used to reset the movieInfo
    public originalMovieData: MovieInfo[] = [];

    constructor(private cacheService: CacheService, private loadService: LoadService) {}

    ngOnInit(): void {
        this.originalMovieData = this.cacheService.getMovieData();
        this.movieInfo = this.originalMovieData

        // we need to subscribe to the below event to fetch data if newly loaded to the cache.
        this.cacheService.movieDataChanged.subscribe(() => {
            this.originalMovieData = this.cacheService.getMovieData();
            this.movieInfo = this.originalMovieData
        });
    }

    public detailsToggle(info: MovieInfo): void {
        // reset data
        this.resetMovieData();
        let movie = this.movieInfo.find((movie) => movie.imdbID === info.imdbID);
        if (!movie) return;
        if (this.isMobileScreenSize) {
            // flag the movie as opened
            movie.isOpened = true;
            // fetch the movie details
            this.fetchMovieDetail(movie.imdbID);
        } else {
            // flag the movie as opened
            movie.isOpened = true;
            // perform a swap only for neccesary items
            let index: number = this.movieInfo.findIndex((movie) => movie.imdbID === info.imdbID);
            if (index !== 0 && index % 2 !== 0) {
                // swap the indexes
                [this.movieInfo[index], this.movieInfo[index - 1]] = [this.movieInfo[index - 1], this.movieInfo[index]]
            }
            // fetch the movie details
            this.fetchMovieDetail(movie.imdbID);
        }
    }

    public getCardStyle(movieInfo: MovieInfo): { 'grid-column': string; } {
        if (movieInfo.isOpened && !this.isMobileScreenSize) {
            // using grid-column to expand a card on the css-grid
            return { 'grid-column': `1 / 3` };
        } else {
            // using grid-column to shrink a card on the css-grid
            return { 'grid-column': `` };
        }
    }

    private fetchMovieDetail(movieId: string): void {
        // look whether the movie detail is already loaded and cached.
        let movieDetail: MovieDetail = this.cacheService.getMovieDetailForId(movieId);
        if (!movieDetail) {
            // if not do a new load for the full movie detail for the id
            this.loadService.searchMovieFull(movieId)
        }
    }

    private resetMovieData(): void {
        // get a clone from the original data without mutating cache data
        this.movieInfo = JSON.parse(JSON.stringify(this.originalMovieData));
    }
}
