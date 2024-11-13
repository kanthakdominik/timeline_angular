import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  private toggleAllCardsSubject = new BehaviorSubject<boolean>(false);
  toggleAllCards$ = this.toggleAllCardsSubject.asObservable();

  toggleAllCards(state: boolean) {
    this.toggleAllCardsSubject.next(state);
  }
}