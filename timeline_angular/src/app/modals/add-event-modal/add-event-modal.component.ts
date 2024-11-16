import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Event as TimelineEvent } from '../../models/event.model';
import { Category } from '../../models/category.model';
import { DataService } from '../../services/data.service';
import { TimelineValidators } from '../../validators/validators';

@Component({
  selector: 'app-add-event-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbModule],
  templateUrl: './add-event-modal.component.html',
  styleUrl: './add-event-modal.component.css'
})
export class AddEventModalComponent implements OnInit {
  categories: Category[] = [];
  addEventForm!: FormGroup;
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
      this.initForm();
    });
  }

  private initForm(): void {
    this.dataService.getEvents().subscribe(events => {
      this.addEventForm = this.fb.group({
        name: ['', Validators.required],
        description: [''],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        category_id: ['', Validators.required],
        image: ['']
      }, { 
        validators: [
          TimelineValidators.dateOrder,
          TimelineValidators.dateOverlap(events)
        ]
      });

      this.addEventForm.get('start_date')?.valueChanges.subscribe(() => {
        this.addEventForm.updateValueAndValidity();
      });

      this.addEventForm.get('end_date')?.valueChanges.subscribe(() => {
        this.addEventForm.updateValueAndValidity();
      });
    });
  }


  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.imageError = null;

    if (input.files && input.files[0]) {
      const validationError = TimelineValidators.imageFile(input);
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

  async onSave(): Promise<void> {
    if (this.addEventForm.invalid || this.imageError) {
      Object.keys(this.addEventForm.controls).forEach(key => {
        const control = this.addEventForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    try {
      const newEvent: TimelineEvent = {
        ...this.addEventForm.value,
        id: this.dataService.getNextEventId(),
        description: this.addEventForm.value.description || '',
        image: this.newImageBase64 || '',
        category_id: Number(this.addEventForm.value.category_id)
      };

      this.dataService.addEvent(newEvent);
      this.activeModal.close(newEvent);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  }

  onClose(): void {
    this.activeModal.dismiss();
  }
}
