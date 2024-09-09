import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSlidersComponent } from './home-sliders.component';

describe('HomeSlidersComponent', () => {
  let component: HomeSlidersComponent;
  let fixture: ComponentFixture<HomeSlidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeSlidersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
