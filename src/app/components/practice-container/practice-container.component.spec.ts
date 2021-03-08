import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { AnalyseDialogComponent } from '@components/analyse-dialog/analyse-dialog.component';

import { PracticeContainerComponent } from './practice-container.component';

describe('PracticeContainerComponent', () => {
  let component: PracticeContainerComponent;
  let fixture: ComponentFixture<PracticeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeContainerComponent,  AnalyseDialogComponent ],
      imports: [ MatDialogModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
