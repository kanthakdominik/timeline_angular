import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditEventModalComponent } from '../modals/edit-event-modal/edit-event-modal.component';
import { DataService } from '../services/data-service.service';
import { ToggleService } from '../services/toggle.service';
import { Event } from '../models/event.model';
import { Category } from '../models/category.model';

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
  categories: Category[] = [];
  isLoggedIn: boolean = true; // Replace with actual authentication logic

  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    private toggleService: ToggleService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.categories = this.dataService.getCategories();
    const events = this.dataService.getEvents();
    this.events = await Promise.all(events.map(async event => ({
      ...event,
      image: await this.dataService.getImageAsBase64(event.image_path),
      category_color: this.dataService.getCategoryColorById(event.category_id),
      isToggled: false
    })));
    this.events.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
 
    this.toggleService.toggleAllCards$.subscribe((state: boolean) => {
      this.toggleAllCards(state);
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

  deleteEvent(eventId: number) {
    // Implement delete event logic
    const event = this.events.find(event => event.id === eventId);
    if (event) {
      console.log('Event properties:', event);
    } else {
      console.log('Event not found');
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