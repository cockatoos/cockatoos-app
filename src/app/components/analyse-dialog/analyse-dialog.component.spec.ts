import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseDialogComponent } from './analyse-dialog.component';

describe('AnalyseDialogComponent', () => {
  let component: AnalyseDialogComponent;
  let fixture: ComponentFixture<AnalyseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
