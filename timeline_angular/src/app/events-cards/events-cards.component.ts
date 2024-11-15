import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditEventModalComponent } from '../modals/edit-event-modal/edit-event-modal.component';
import { DataService } from '../services/data-service.service';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';
import { Category } from '../models/category.model';
import { ActivatedRoute } from '@angular/router';

interface EventWithCategoryColor extends Event {
  category_color?: string;
  isToggled?: boolean;
}

@Component({
  selector: 'app-events-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-cards.component.html',
  styleUrl: './events-cards.component.css'
})
export class EventsCardsComponent implements OnInit {
  events: EventWithCategoryColor[] = [];
  filteredEvents: EventWithCategoryColor[] = [];
  categories: Category[] = [];
  isLoggedIn: boolean = true; // Replace with actual authentication logic

  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    private eventService: EventService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.categories = this.dataService.getCategories();
    this.route.data.subscribe(data => {
      this.events = data['events'];
      this.filteredEvents = [...this.events];
      this.events.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
      this.filteredEvents.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
    });

    this.eventService.toggleAllCards$.subscribe((state: boolean) => {
      this.toggleAllCards(state);
    });
    this.eventService.filterEvents$.subscribe((categoryId: number | null) => {
      this.filterEventsByCategory(categoryId);
    });
  }

  toggleCard(event: EventWithCategoryColor): void {
    event.isToggled = !event.isToggled;
  }

  toggleAllCards(areAllCardsToggled: boolean): void {
    this.events.forEach(event => {
      event.isToggled = areAllCardsToggled;
    });
  }

  getCategoryName(category_id: number): string {
    const category = this.categories.find(cat => cat.id === category_id);
    return category ? category.name : 'Nieznana';
  }

  filterEventsByCategory(categoryId: number | null): void {
    if (categoryId === null) {
      this.filteredEvents = [...this.events];
    } else {
      this.filteredEvents = this.events.filter(event => event.category_id === categoryId);
    }
  }

  deleteEvent(eventId: number): void {
    const event = this.events.find(event => event.id === eventId);
    if (event) {
      const confirmDelete = window.confirm(`Are you sure you want to delete the event: ${event.name}?`);
      if (confirmDelete) {
        this.dataService.deleteEvent(eventId);
        this.events = this.events.filter(e => e.id !== eventId);
        this.filteredEvents = this.filteredEvents.filter(e => e.id !== eventId);
      }
    }
  }

  openEditEventModal(event: Event): void {
    const modalRef = this.modalService.open(EditEventModalComponent);
    modalRef.componentInstance.event = event;
    modalRef.result.then((result) => {
      if (result) {
        this.dataService.updateEvent(result);
        this.events = this.dataService.getEvents()
          .map(event => ({
            ...event,
            category_color: this.dataService.getCategoryColorById(event.category_id)
          }))
          .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()); // Refresh the events list
      }
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });
  }
}