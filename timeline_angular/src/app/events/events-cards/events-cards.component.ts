import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Event } from '../../models/event.model';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { EditEventModalComponent } from '../../modals/edit-event-modal/edit-event-modal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-cards.component.html',
  styleUrl: './events-cards.component.css'
})
export class EventsCardsComponent implements OnInit {
  events: (Event & { categoryColor?: string, isExpanded: boolean })[] = [];
  activeCategoryId: number | null = null;
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;

    this.dataService.getCombinedEventData().subscribe(events => {
      if (this.activeCategoryId === null) {
        this.events = events;
      } else {
        this.events = events.filter(event => event.category_id === this.activeCategoryId);
      }
    });

    this.dataService.activeCategoryFilter$.subscribe(categoryId => {
      this.activeCategoryId = categoryId;
      this.dataService.getCombinedEventData().subscribe(events => {
        if (categoryId === null) {
          this.events = events;
        } else {
          this.events = events.filter(event => event.category_id === categoryId);
        }
      });
    });

    this.dataService.cardsExpandedState$.subscribe(expanded => {
      this.events.forEach(event => {
        event.isExpanded = expanded;
      });
    });
  }

  toggleCard(event: Event & { categoryColor?: string, isExpanded: boolean }): void {
    event.isExpanded = !event.isExpanded;
  }

  removeEvent(eventId: number): void {
    const confirmation = confirm('Czy chcesz na pewno usunąć wydarzenie?');
    if (confirmation) {
      this.dataService.deleteEvent(eventId);
      this.events = this.events.filter(event => event.id !== eventId);
    }
  }

  openEditModal(eventId: number): void {
    const modalRef = this.modalService.open(EditEventModalComponent);
    modalRef.componentInstance.eventId = eventId;
  }
}