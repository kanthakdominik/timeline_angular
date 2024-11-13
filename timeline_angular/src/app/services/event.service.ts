import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private toggleAllCardsSubject = new BehaviorSubject<boolean>(false);
  toggleAllCards$ = this.toggleAllCardsSubject.asObservable();

  private filterEventsSubject = new BehaviorSubject<number | null>(null);
  filterEvents$ = this.filterEventsSubject.asObservable();

  toggleAllCards(state: boolean) {
    this.toggleAllCardsSubject.next(state);
  }

  filterEvents(categoryId: number | null) {
    this.filterEventsSubject.next(categoryId);
  }
}