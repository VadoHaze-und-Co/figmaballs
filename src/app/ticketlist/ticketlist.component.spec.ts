import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketlistComponent } from './ticketlist.component';

describe('TicketlistComponent', () => {
  let component: TicketlistComponent;
  let fixture: ComponentFixture<TicketlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
