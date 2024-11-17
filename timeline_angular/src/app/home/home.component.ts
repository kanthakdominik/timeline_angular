import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainBarComponent } from '../bars/main-bar/main-bar.component';
import { SettingsBarComponent } from '../bars/settings-bar/settings-bar.component';
import { ViewModeBarComponent } from '../bars/view-mode-bar/view-mode-bar.component';
import { CategoriesBarComponent } from '../bars/categories-bar/categories-bar.component';
import { EventsCardsComponent } from '../cards/events-cards/events-cards.component';
import { FilterBarComponent } from '../bars/filter-bar/filter-bar.component';
import { TableCardsComponent } from '../cards/table-cards/table-cards.component';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MainBarComponent,
    SettingsBarComponent,
    ViewModeBarComponent,
    CategoriesBarComponent,
    EventsCardsComponent,
    FilterBarComponent,
    TableCardsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  viewMode$: Observable<'timeline' | 'table'>;

  constructor(private dataService: DataService) {
    this.viewMode$ = this.dataService.viewMode$;
  }
}
