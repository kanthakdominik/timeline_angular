import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export class CustomValidators {
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
}