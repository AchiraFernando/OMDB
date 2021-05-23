import { Component, Input, OnInit } from '@angular/core';
import { CacheService } from 'src/app/services/cache.service';
import { LoadService } from 'src/app/services/load.service';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

    public startupBannerText: string = 'Welcome to OMDB Search, search something in the bar above!';

    constructor(private cacheService: CacheService, private loadService: LoadService) { }

    ngOnInit(): void {
    }

    public lastThrownError(): string {
        return this.loadService.lastThrownError;
    }

    public showStartupBanner(): boolean {
        if (!this.cacheService.searchTerm && !this.lastThrownError()) {
            return true;
        } else {
            return false;
        }
    }

}
