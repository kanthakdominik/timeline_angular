import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { EditEventModalComponent } from '../../modals/edit-event-modal/edit-event-modal.component';
import { Observable } from 'rxjs';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-table-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-cards.component.html',
  styleUrl: './table-cards.component.css'
})
export class TableCardsComponent implements OnInit {
  events: (Event & { categoryColor?: string, categoryName?: string })[] = [];
  activeCategoryId: number | null = null;
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

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