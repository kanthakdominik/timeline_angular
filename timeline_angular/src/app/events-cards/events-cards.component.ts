import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category.model';
import { Event } from '../models/event.model';
import { DataService } from '../services/data.service';

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

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCombinedEventData().subscribe(events => {
      this.events = events;
      console.log('Fetched combined events:', this.events);
    });
  }

  toggleCard(event: Event & { categoryColor?: string, isToggled: boolean }): void {
    event.isToggled = !event.isToggled;
  }
}