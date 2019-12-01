import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollForm2Component } from './poll-form2.component';

describe('PollForm2Component', () => {
  let component: PollForm2Component;
  let fixture: ComponentFixture<PollForm2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollForm2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
