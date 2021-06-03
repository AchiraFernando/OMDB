import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CacheService } from 'src/app/services/cache.service';
import { LoadService } from 'src/app/services/load.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    public searchTermControl: FormControl = new FormControl();

    constructor(private cacheService: CacheService, private loadService: LoadService) { }

    ngOnInit(): void {
    }

    public searchClick(): void {
        this.cacheService.searchTerm = this.searchTermControl.value;
        this.loadService.searchMovie(this.searchTermControl.value);
        // clear the search after doing a search.
        this.searchTermControl.reset();
    }

}
