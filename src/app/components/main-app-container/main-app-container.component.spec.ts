import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAppContainerComponent } from './main-app-container.component';

describe('MainAppContainerComponent', () => {
  let component: MainAppContainerComponent;
  let fixture: ComponentFixture<MainAppContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAppContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAppContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
