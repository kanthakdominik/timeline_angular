import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Event } from '../models/event.model';
import { DataService } from '../services/data.service';
import { EditEventModalComponent } from '../modals/edit-event-modal/edit-event-modal.component';

@Component({
  selector: 'app-events-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-cards.component.html',
  styleUrl: './events-cards.component.css'
})
export class EventsCardsComponent implements OnInit{
  events: (Event & { categoryColor?: string, isToggled: boolean })[] = [];
  isLoggedIn: boolean = true; 

  constructor(
    private dataService: DataService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.dataService.getCombinedEventData().subscribe(events => {
      this.events = events;
      console.log('Fetched combined events:', this.events);
    });
  }

  toggleCard(event: Event & { categoryColor?: string, isToggled: boolean }): void {
    event.isToggled = !event.isToggled;
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