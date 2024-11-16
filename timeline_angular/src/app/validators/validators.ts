import { FormControl } from '@angular/forms';

export function endDateValidator(control: FormControl): { [key: string]: boolean } | null {
  const startDate = control.parent?.get('start_date')?.value;
  const endDate = control.value;
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
    return { 'endDateInvalid': true };
  }
  return null;
} 

export function imageValidator(control: FormControl): { [key: string]: boolean } | null {
    const file = control.value;
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        return { 'invalidFileType': true };
      }
      if (file.size > 2048 * 1024) {
        return { 'fileTooLarge': true };
      }
    }
    return null;
  }