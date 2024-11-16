import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Event } from '../../models/event.model'; 
import { DataService } from '../../services/data.service';
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
  event?: Event;
  editEventForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    console.log('Modal initialized with event ID:', this.eventId);
    this.loadEvent();
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
      image_path: [this.event?.image_path || '']
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

  onSave(): void {
    if (this.editEventForm.invalid) {
      Object.keys(this.editEventForm.controls).forEach(key => {
        const control = this.editEventForm.get(key);
        control?.markAsTouched();
      });
      this.editEventForm.updateValueAndValidity();
      return;
    }
  
    if (this.event) {
      const updatedEvent: Event = {
        ...this.event,
        ...this.editEventForm.value,
        description: this.editEventForm.value.description || '',
        category_id: this.event.category_id,
        id: this.event.id
      };
      
      try {
        this.dataService.updateEvent(updatedEvent);
        this.activeModal.close(updatedEvent);
      } catch (error) {
        console.error('Error updating event:', error);
      }
    }
  }

  onClose(): void {
    this.activeModal.dismiss();
  }
}
