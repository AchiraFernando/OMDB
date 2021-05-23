import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CacheService } from 'src/app/services/cache.service';
import { LoadService } from 'src/app/services/load.service';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let loadService: LoadService;
  let cacheService: CacheService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CacheService, LoadService, HttpClient, HttpHandler],
      declarations: [ BannerComponent ]
    }).compileComponents();
    loadService = TestBed.inject(LoadService);
    cacheService = TestBed.inject(CacheService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct startup banner', () => {
    loadService.lastThrownError = '';
    cacheService.searchTerm = '';

    const fixture = TestBed.createComponent(BannerComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.startup-text').textContent).toContain('Welcome to OMDB Search, search something in the bar above!');
  });

  it('should render correct error banner', () => {
    loadService.lastThrownError = 'Invalid Movie Title!';
    cacheService.searchTerm = '';

    const fixture = TestBed.createComponent(BannerComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.error-text').textContent).toContain('Invalid Movie Title!');
  });
});
