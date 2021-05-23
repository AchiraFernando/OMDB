import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/services/cache.service';
import { LoadService } from 'src/app/services/load.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    public searchTerm: string = '';

    constructor(private cacheService: CacheService, private loadService: LoadService) { }

    ngOnInit(): void {
    }

    public searchClick() {
        this.cacheService.searchTerm = this.searchTerm;
        this.loadService.searchMovie(this.searchTerm);
    }

}
