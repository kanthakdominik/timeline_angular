import { Component, OnInit, AfterViewInit, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data-service.service';
import { Event } from '../models/event.model';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-edit-event-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-event-modal.component.html',
  styleUrl: './edit-event-modal.component.css'
})
export class EditEventModalComponent implements OnInit, AfterViewInit {
  @Input() eventId!: number;
  editEventForm!: FormGroup;
  categories: Category[] = [];

  constructor(public modal: NgbActiveModal, private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.categories = this.dataService.getCategories();

    this.editEventForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      image: [null],
      category_id: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    if (this.eventId) {
      this.setEventData(this.eventId);
    }
  }

  setEventData(eventId: number): void {
    const event = this.dataService.getEventById(eventId);
    if (event) {
      this.editEventForm.patchValue({
        id: event.id,
        name: event.name,
        description: event.description,
        start_date: event.start_date,
        end_date: event.end_date,
        category_id: event.category_id
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.editEventForm.patchValue({
        image: file
      });
    }
  }

  onSubmit(): void {
    if (this.editEventForm.valid) {
      // Handle form submission
      console.log(this.editEventForm.value);
      this.modal.close(this.editEventForm.value);
    }
  }
}
