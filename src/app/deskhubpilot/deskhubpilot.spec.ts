import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deskhubpilot } from './deskhubpilot.component';

describe('Deskhubpilot', () => {
  let component: Deskhubpilot;
  let fixture: ComponentFixture<Deskhubpilot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deskhubpilot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deskhubpilot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
