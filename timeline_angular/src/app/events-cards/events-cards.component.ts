import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Event {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  description: string;
  image: string;
  category: {
    id: number;
    color: string;
  };
}

@Component({
  selector: 'app-events-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-cards.component.html',
  styleUrl: './events-cards.component.css'
})
export class EventsCardsComponent {
  isLoggedIn: boolean = true; // Replace with actual authentication logic
  events: Event[] = [
    {
      id: 1,
      name: 'Event 1',
      start_date: '2024-01-01',
      end_date: '2024-01-02',
      description: 'Description for Event 1',
      image: 'base64image1',
      category: { id: 1, color: '#ff0000' }
    },
    {
      id: 2,
      name: 'Event 2',
      start_date: '2024-02-01',
      end_date: '2024-02-02',
      description: 'Description for Event 2',
      image: 'base64image2',
      category: { id: 2, color: '#00ff00' }
    },
    {
      id: 3,
      name: 'Event 3',
      start_date: '2024-03-01',
      end_date: '2024-03-02',
      description: 'Description for Event 3',
      image: 'base64image3',
      category: { id: 3, color: '#0000ff' }
    }
  ]; // Replace with actual events data

  // Implement methods for button actions
  openEditModal(eventId: number) {
    // Implement open edit modal logic
  }

  deleteEvent(eventId: number) {
    // Implement delete event logic
  }
}