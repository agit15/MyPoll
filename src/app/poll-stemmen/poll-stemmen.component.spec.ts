import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollStemmenComponent } from './poll-stemmen.component';

describe('PollStemmenComponent', () => {
  let component: PollStemmenComponent;
  let fixture: ComponentFixture<PollStemmenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollStemmenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollStemmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
