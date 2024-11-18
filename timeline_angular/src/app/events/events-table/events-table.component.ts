import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, SortConfig } from '../../services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { EditEventModalComponent } from '../../modals/edit-event-modal/edit-event-modal.component';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { Observable, combineLatest } from 'rxjs';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-events-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-table.component.html',
  styleUrl: './events-table.component.css'
})
export class EventsTableComponent implements OnInit {
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
  
    combineLatest([
      this.dataService.sortConfig$,
      this.dataService.dateFilter$,
      this.dataService.getCombinedEventData(),
      this.dataService.activeCategoryFilter$
    ]).subscribe(([sortConfig, dateFilter, events, categoryId]) => {
      let filteredEvents = events;
  
      if (categoryId !== null) {
        filteredEvents = filteredEvents.filter(event => event.category_id === categoryId);
      }
      if (dateFilter.startDate) {
        filteredEvents = filteredEvents.filter(event => 
          new Date(event.start_date) >= dateFilter.startDate!
        );
      }
      if (dateFilter.endDate) {
        filteredEvents = filteredEvents.filter(event => 
          new Date(event.end_date) <= dateFilter.endDate!
        );
      }
        this.events = this.sortEvents(filteredEvents, sortConfig);
    });
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

  private sortEvents(events: (Event & { categoryColor?: string, categoryName?: string })[], 
                    sortConfig: SortConfig): (Event & { categoryColor?: string, categoryName?: string })[] {
    return [...events].sort((a, b) => {
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      
      switch (sortConfig.field) {
        case 'name':
          return direction * (a.name?.localeCompare(b.name || '') || 0);
        case 'start_date':
          return direction * (new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
        case 'end_date':
          return direction * (new Date(a.end_date).getTime() - new Date(b.end_date).getTime());
        case 'category':
          return direction * ((a.categoryName || '').localeCompare(b.categoryName || '') || 0);
        default:
          return 0;
      }
    });
  }
}