import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieDetail } from 'src/app/models/MovieDetail';
import { MovieInfo } from 'src/app/models/MovieInfo';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

    @Input()
    movieInfo: MovieInfo = {} as MovieInfo;

    @Output()
    detailsClickEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    detailOpened: boolean = false;

    public movieDetail: MovieDetail = {} as MovieDetail;

    // the component is kept clean to depend only on the cache but not perform requests.
    constructor(private cacheService: CacheService) { }

    ngOnInit(): void {
        // here we subscribe to fetch the movie details if loaded.
        this.cacheService.movieDetailsChanged.subscribe(() => {
            this.movieDetail = this.cacheService.getMovieDetailForId(this.movieInfo.imdbID);
        });
    }

    expandDetails() {
        this.detailsClickEvent.emit(true);
    }

        shrinkDetails() {
        this.detailsClickEvent.emit(false);
    }

}
