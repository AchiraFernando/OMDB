import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CacheService } from 'src/app/services/cache.service';
import { LoadService } from 'src/app/services/load.service';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  let loadService: LoadService;
  let cacheService: CacheService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
      providers: [CacheService, LoadService, HttpClient, HttpHandler]
    }).compileComponents();
    loadService = TestBed.inject(LoadService);
    cacheService = TestBed.inject(CacheService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only four clickable pages', () => {
    cacheService.pageNumber = 8;
    cacheService.totalMovies = 100;

    const fixture = TestBed.createComponent(PaginatorComponent);
    const app = fixture.componentInstance;
    let pagesList = app.pages();
    expect(pagesList.length).toEqual(4);
  });

  it('should render correct pages', () => {
    cacheService.pageNumber = 8;
    cacheService.totalMovies = 100;

    const fixture = TestBed.createComponent(PaginatorComponent);
    const app = fixture.componentInstance;
    let pagesList = app.pages();
    expect(pagesList).toEqual([6, 7, 8, 9]);
  });

  it('should render the ellipsis', () => {
    cacheService.pageNumber = 8;
    cacheService.totalMovies = 100;

    const fixture = TestBed.createComponent(PaginatorComponent);
    const app = fixture.componentInstance;
    expect(app.elpsisVisible).toBeTruthy();
  });

  it('should not render the ellipsis', () => {
    cacheService.pageNumber = 98;
    cacheService.totalMovies = 100;

    const fixture = TestBed.createComponent(PaginatorComponent);
    const app = fixture.componentInstance;
    expect(app.elpsisVisible).toBeFalsy();
  });
});
