import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockMainComponent } from './clock-main.component';

describe('ClockMainComponent', () => {
  let component: ClockMainComponent;
  let fixture: ComponentFixture<ClockMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
