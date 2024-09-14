import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsengaComponent } from './consenga.component';

describe('ConsengaComponent', () => {
  let component: ConsengaComponent;
  let fixture: ComponentFixture<ConsengaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsengaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsengaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
