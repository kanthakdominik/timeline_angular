import { Routes } from '@angular/router';
import { EventsCardsComponent } from './events-cards/events-cards.component';
import { EventsResolver } from './resolvers/events-resolver.service';

export const routes: Routes = [
    {
        path: '',
        component: EventsCardsComponent,
        resolve: {
          events: EventsResolver
        }
      },
];
