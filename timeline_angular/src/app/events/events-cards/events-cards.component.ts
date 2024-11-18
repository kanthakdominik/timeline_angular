import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Event } from '../../models/event.model';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { EditEventModalComponent } from '../../modals/edit-event-modal/edit-event-modal.component';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';

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

  async removeEvent(eventId: number): Promise<void> {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.title = 'Usuń wydarzenie';
    modalRef.componentInstance.message = 'Czy chcesz na pewno usunąć wydarzenie?';
    modalRef.componentInstance.confirmButtonText = 'Usuń';
    modalRef.componentInstance.cancelButtonText = 'Anuluj';

    try {
      const result = await modalRef.result;
      if (result === 'confirm') {
        this.dataService.deleteEvent(eventId);
        this.events = this.events.filter(event => event.id !== eventId);
      }
    } catch {}
  }

  openEditModal(eventId: number): void {
    const modalRef = this.modalService.open(EditEventModalComponent);
    modalRef.componentInstance.eventId = eventId;
  }
}