import { Component, HostListener, OnInit } from '@angular/core';
import { MovieInfo } from 'src/app/models/MovieInfo';
import { CacheService } from 'src/app/services/cache.service';
import { LoadService } from 'src/app/services/load.service';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

    private scrWidth: number = window.innerWidth;
    @HostListener('window:resize', ['$event'])
    getScreenSize() {
          this.scrWidth = window.innerWidth;
    }
    public get isMobileScreenSize(): boolean {
        if (this.scrWidth < 800) return true;
        return false;
    }

    public bannerText = 'Movie not found!';

    private openedCardIndex: number = -1;
    private openedCardId: string = '';

    public movieInfo: MovieInfo[] = [];

    constructor(private cacheService: CacheService, private loadService: LoadService) {
    }

    ngOnInit(): void {
        this.movieInfo = this.cacheService.getMovieData();

        this.cacheService.movieDataChanged.subscribe(() => {
            this.movieInfo = this.cacheService.getMovieData();
        });
    }

    public isCardOpened(cardId: string): boolean {
        if (cardId === this.openedCardId) return true;
        return false;
    }

    public detailsToggle(movieInfo: MovieInfo, index: number, detailsToggled: boolean) {
        if (this.isMobileScreenSize) {
            if (detailsToggled) {
                this.fetchMovieDetail(movieInfo.imdbID);
                this.openedCardId = movieInfo.imdbID;
            } else {
                this.openedCardId = '';
            }
        } else {
            if (detailsToggled) {
                this.fetchMovieDetail(movieInfo.imdbID);

                this.openedCardId = movieInfo.imdbID;
                this.resetExpandedItems();
                this.openedCardIndex = index;
            } else {
                this.openedCardId = '';
                if (this.openedCardIndex !== -1) {
                    [this.movieInfo[index], this.movieInfo[index + 1]] = [this.movieInfo[index + 1], this.movieInfo[index]]
                }
                this.openedCardIndex = -1;
            }
        }
    }

    // the styling below works dynamically for the css grid.
    // here we use grid-column value to expand and shrink the card.
    public getCardStyle(cardIndex: number) {
        if (cardIndex === this.openedCardIndex) {
            if (cardIndex !== 0 && cardIndex % 2 !== 0) {
                return { 'grid-column': `3 / 1` };
            } else {
                return { 'grid-column': `1 / 3` };
            }
        } else {
            return { 'grid-column': `` };
        }
    }

    public populateItems() {
        if (this.openedCardIndex === -1) return this.movieInfo;
        if (this.openedCardIndex === 0 || this.openedCardIndex % 2 === 0) return this.movieInfo;
        let beforeIndex = this.openedCardIndex - 1;
        this.movieInfo.splice(this.openedCardIndex + 1, 0, this.movieInfo[beforeIndex]);
        this.movieInfo.splice(beforeIndex, 1);
        this.openedCardIndex--;
        return this.movieInfo;
    }

    private resetExpandedItems() {
        // if no card is opened, we don't want to perform reset.
        if (this.openedCardIndex === -1) return;
        [this.movieInfo[this.openedCardIndex], this.movieInfo[this.openedCardIndex + 1]] = [this.movieInfo[this.openedCardIndex + 1], this.movieInfo[this.openedCardIndex]]
        this.openedCardIndex = -1;
    }

    private fetchMovieDetail(movieId: string) {
        // look whether the movie detail is already loaded and cached.
        let movieDetail = this.cacheService.getMovieDetailForId(movieId);
        if (!movieDetail) {
            // if not do a new load for the full movie detail for the id
            this.loadService.searchMovieFull(movieId)
        }
    }

    public showBanner(): boolean {
        if (!this.cacheService.searchTerm) {
            return true;
        } else {
            return false;
        }
    }

}
