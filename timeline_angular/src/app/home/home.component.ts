import { Component } from '@angular/core';
import { MainBarComponent } from '../bars/main-bar/main-bar.component';
import { SettingsBarComponent } from '../bars/settings-bar/settings-bar.component';
import { CategoriesBarComponent } from '../bars/categories-bar/categories-bar.component';
import { EventsCardsComponent } from '../events-cards/events-cards.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ 
    MainBarComponent,
    SettingsBarComponent,
    CategoriesBarComponent,
    EventsCardsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
