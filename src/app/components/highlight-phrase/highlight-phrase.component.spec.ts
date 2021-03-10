import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightPhraseComponent } from './highlight-phrase.component';

describe('HighlightPhraseComponent', () => {
  let component: HighlightPhraseComponent;
  let fixture: ComponentFixture<HighlightPhraseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighlightPhraseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightPhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
