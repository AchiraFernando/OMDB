import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/services/cache.service';
import { LoadService } from 'src/app/services/load.service';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

    constructor(private cacheService: CacheService, private loadService: LoadService) { }

    ngOnInit(): void {
    }

    public get totalMovies(): number {
        return this.cacheService.totalMovies;
    };

    public getCurrentPage(): number {
        return this.cacheService.pageNumber;
    }

    public get elpsisVisible(): boolean {
        if (this.getCurrentPage() > this.totalMovies - 4) {
            return false;
        }
        return true;
    }

    public pages(): number[] {
        let pageArray: number[] = [];
        if (this.getCurrentPage() < 4) {
            let pageLimit = 5;
            if (this.totalMovies < 4) pageLimit = this.totalMovies;
            for (let i = 1; i < pageLimit; i++) {
                pageArray.push(i);
            }
        } else if (this.getCurrentPage() >= 4) {
            for (let i = this.getCurrentPage() - 2; (i < this.getCurrentPage() + 2 && i < this.totalMovies); i++) {
                pageArray.push(i);
            }
        } else {
            for (let i = this.getCurrentPage(); (i < this.getCurrentPage() + 4 && i < this.totalMovies); i++) {
                pageArray.push(i);
            }
        }
        return pageArray;
    }

    public pageClick(page: number): void {
        this.cacheService.pageNumber = page;
        if (!this.cacheService.isPageLoaded(page)) {
            this.loadService.loadPage(page);
        } else {
            this.cacheService.triggerPageLoad();
        }
    }

}
