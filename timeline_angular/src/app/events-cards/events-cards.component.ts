import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditEventModalComponent } from '../edit-event-modal/edit-event-modal.component';
import { DataService } from '../services/data-service.service';
import { Event } from '../models/event.model';
import { Category } from '../models/category.model';

interface EventWithCategoryColor extends Event {
  category_color?: string;
}

@Component({
  selector: 'app-events-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-cards.component.html',
  styleUrl: './events-cards.component.css'
})
export class EventsCardsComponent {
  events: EventWithCategoryColor[] = [];
  categories: Category[] = [];
  isLoggedIn: boolean = true; // Replace with actual authentication logic

  constructor(private modalService: NgbModal, private dataService: DataService) {}
 
  ngOnInit(): void {
    this.categories = this.dataService.getCategories();
    this.events = this.dataService.getEvents().map(event => ({
      ...event,
      category_color: this.dataService.getCategoryColorById(event.category_id)
    }));
  }

  getCategoryName(category_id: number): string {
    const category = this.categories.find(cat => cat.id === category_id);
    return category ? category.name : 'Nieznana';
  }

  deleteEvent(eventId: number) {
    // Implement delete event logic
  }

  openEditEventModal(event: Event): void {
    const modalRef = this.modalService.open(EditEventModalComponent);
    modalRef.componentInstance.event = event;
    modalRef.result.then((result) => {
      if (result) {
        this.dataService.updateEvent(result);
        this.events = this.dataService.getEvents().map(event => ({
          ...event,
          category_color: this.dataService.getCategoryColorById(event.category_id)
        }));
      }
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });
  }
}