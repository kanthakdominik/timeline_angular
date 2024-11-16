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
}