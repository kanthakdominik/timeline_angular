import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Event as TimelineEvent } from '../models/event.model';

export class TimelineValidators {

  static dateOrder(controlGroup: AbstractControl): ValidationErrors | null {
    const formGroup = controlGroup as FormGroup;
    const startDate = formGroup.get('start_date')?.value;
    const endDate = formGroup.get('end_date')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end < start) {
        return { dateError: 'Data zakończenia nie może być wcześniejsza niż data rozpoczęcia' };
      }
    }
    return null;
  }

  static imageFile(input: HTMLInputElement): ValidationErrors | null {
    const file = input.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        return { invalidImageType: 'Dozwolone są tylko pliki obrazów (JPG, PNG, GIF)' };
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        return { invalidImageSize: 'Rozmiar pliku nie może przekraczać 5MB' };
      }
    }
    return null;
  }

  static dateOverlap(events: TimelineEvent[], currentEventId?: number) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const startDate = formGroup.get('start_date')?.value;
      const endDate = formGroup.get('end_date')?.value;

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const hasOverlap = events.some(event => {
          if (currentEventId && event.id === currentEventId) {
            return false;
          }

          const eventStart = new Date(event.start_date);
          const eventEnd = new Date(event.end_date);

          return (
            (start >= eventStart && start <= eventEnd) ||
            (end >= eventStart && end <= eventEnd) ||
            (start <= eventStart && end >= eventEnd)
          );
        });

        if (hasOverlap) {
          return { dateOverlap: 'W tym okresie istnieje już inne wydarzenie' };
        }
      }
      return null;
    };
  }

  static passwordMatch(g: FormGroup): ValidationErrors | null {
    return g.get('password')?.value === g.get('password_confirmation')?.value
      ? null 
      : { 'mismatch': true };
  }
}