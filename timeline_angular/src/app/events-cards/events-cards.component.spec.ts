import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsCardsComponent } from './events-cards.component';

describe('EventsCardsComponent', () => {
  let component: EventsCardsComponent;
  let fixture: ComponentFixture<EventsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
