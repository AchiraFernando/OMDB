import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { CardComponent } from './components/card/card.component';
import { DetailComponent } from './components/detail/detail.component';
import { SearchComponent } from './components/search/search.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CacheService } from './services/cache.service';
import { LoadService } from './services/load.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SearchComponent,
    MainPageComponent,
    BannerComponent,
    CardComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [LoadService, CacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
