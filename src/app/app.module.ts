import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CacheService } from './services/cache.service';
import { LoadService } from './services/load.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentComponent } from './components/content/content.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SearchComponent,
    MainPageComponent,
    BannerComponent,
    CardComponent,
    ContentComponent,
    PaginatorComponent,
    MovieDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [LoadService, CacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
