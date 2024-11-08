import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainBarComponent } from './bars/main-bar/main-bar.component';
import { SettingsBarComponent } from "./bars/settings-bar/settings-bar.component";
import { CategoriesBarComponent } from "./bars/categories-bar/categories-bar.component";
import { EventsCardsComponent } from "./events-cards/events-cards.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainBarComponent, SettingsBarComponent, CategoriesBarComponent, EventsCardsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'timeline_angular';
}
