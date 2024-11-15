import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../services/data-service.service';
import { Event } from '../models/event.model';

@Injectable({
    providedIn: 'root'
})
export class EventsResolver implements Resolve<Event[]> {
    constructor(private dataService: DataService) { }

    resolve(): Observable<Event[]> {
        return this.dataService.fetchAndMapEventsWithCategoryColor().pipe(
            switchMap(events => from(Promise.all(events.map(async event => ({
                ...event,
                image: await this.dataService.getImageAsBase64(event.image_path),
                isToggled: false
            })))))
        );
    }
}