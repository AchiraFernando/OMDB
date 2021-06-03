import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    // This is a fully reusable component that contains a ng-content which can
    // render content that is wrapped between the app-card selector.
    // This way we can reuse the app-card to make your own cards in the application.

    // Right now we wrap movie-detail template as it's the only place we use cards.
    constructor() { }

    ngOnInit(): void {
    }

}
