import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Event as CustomEvent } from '../../models/event.model';
import { DataService } from '../../services/data.service';
import { Category } from '../../models/category.model';
import { CustomValidators } from '../../validators/validators';

@Component({
  selector: 'app-edit-event-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbModule],
  templateUrl: './edit-event-modal.component.html',
  styleUrl: './edit-event-modal.component.css'
})
export class EditEventModalComponent implements OnInit {
  @Input() eventId!: number;
  event?: CustomEvent;
  categories: Category[] = [];
  editEventForm!: FormGroup;
  newImageBase64: string | null = null;
  imageError: string | null = null;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loadEvent();
    });
  }

  private loadEvent(): void {
    const event = this.dataService.getEventById(this.eventId);
    if (event) {
      this.event = event;
      this.initForm();
    } else {
      console.error('Event not found');
      this.activeModal.dismiss('Event not found');
    }
  }

  private initForm(): void {
    this.editEventForm = this.fb.group({
      name: [this.event?.name || '', Validators.required],
      description: [this.event?.description || ''],
      start_date: [this.event?.start_date || '', Validators.required],
      end_date: [this.event?.end_date || '', Validators.required],
      image: [this.event?.image || ''],
      category_id: [this.event?.category_id || '', Validators.required]
    }, { 
      validators: CustomValidators.dateOrder 
    });

    this.editEventForm.get('start_date')?.valueChanges.subscribe(() => {
      this.editEventForm.updateValueAndValidity();
    });

    this.editEventForm.get('end_date')?.valueChanges.subscribe(() => {
      this.editEventForm.updateValueAndValidity();
    });
  }

  async onSave(): Promise<void> {
    if (this.editEventForm.invalid || this.imageError) {
      Object.keys(this.editEventForm.controls).forEach(key => {
        const control = this.editEventForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    if (this.event) {
      try {
        const updatedEvent: CustomEvent = {
          ...this.event,
          ...this.editEventForm.value,
          description: this.editEventForm.value.description || '',
          image: this.newImageBase64 || this.event.image,
          category_id: Number(this.editEventForm.value.category_id),
          id: this.event.id
        };

        this.dataService.updateEvent(updatedEvent);
        this.activeModal.close(updatedEvent);
      } catch (error) {
        console.error('Error updating event:', error);
      }
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.imageError = null;

    if (input.files && input.files[0]) {
      const validationError = CustomValidators.imageFile(input);
      if (validationError) {
        this.imageError = Object.values(validationError)[0];
        input.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.newImageBase64 = reader.result as string;
        }
      };
      reader.onerror = () => {
        this.imageError = 'Wystąpił błąd podczas wczytywania pliku';
        input.value = '';
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onClose(): void {
    this.activeModal.dismiss();
  }
}
