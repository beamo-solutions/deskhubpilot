import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadModalComponent } from './lead-modal.component';

describe('LeadModal', () => {
  let component: LeadModalComponent;
  let fixture: ComponentFixture<LeadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
