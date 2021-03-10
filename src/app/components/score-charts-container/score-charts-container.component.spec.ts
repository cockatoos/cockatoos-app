import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreChartsContainerComponent } from './score-charts-container.component';

describe('ScoreChartsContainerComponent', () => {
  let component: ScoreChartsContainerComponent;
  let fixture: ComponentFixture<ScoreChartsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreChartsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreChartsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
