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

    public get totalPages(): number {
        if (!this.cacheService.totalMovies) return 0;
        let pages: number = Math.round(this.cacheService.totalMovies / 10);

        if (this.cacheService.totalMovies % 10 === 0 || this.cacheService.totalMovies % 10 > 5) {
            return pages;
        }
        return pages + 1;
    };

    public getCurrentPage(): number {
        return this.cacheService.pageNumber;
    }

    public get elpsisVisible(): boolean {
        if (this.getCurrentPage() > this.totalPages - 4) {
            return false;
        }
        return true;
    }

    public get paginationVisible(): boolean {
        return this.totalPages > 0;
    }

    public get backVisible(): boolean {
        return this.getCurrentPage() >= 4;
    }

    public pages(): number[] {
        let pageArray: number[] = [];
        if (this.getCurrentPage() < 4) {
            let pageLimit = 5;
            if (this.totalPages < 4) pageLimit = this.totalPages;
            for (let i = 1; i < pageLimit; i++) {
                pageArray.push(i);
            }
        } else if (this.getCurrentPage() >= 4) {
            for (let i = this.getCurrentPage() - 2; (i < this.getCurrentPage() + 2 && i < this.totalPages); i++) {
                pageArray.push(i);
            }
        } else {
            for (let i = this.getCurrentPage(); (i < this.getCurrentPage() + 4 && i < this.totalPages); i++) {
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
