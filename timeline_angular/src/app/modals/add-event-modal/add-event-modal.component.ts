import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category.model';
import { DataService } from '../../services/data-service.service';

@Component({
  selector: 'app-add-event-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-event-modal.component.html',
  styleUrl: './add-event-modal.component.css'
})
export class AddEventModalComponent implements OnInit {
  addEventForm!: FormGroup;
  categories: Category[] = [];

  constructor(
    public modal: NgbActiveModal, 
    private fb: FormBuilder, 
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.categories = this.dataService.getCategories();

    this.addEventForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      image: [null],
      category_id: ['', Validators.required]
    });

    this.addEventForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      start_date: ['', Validators.required],
      end_date: ['', [Validators.required, this.endDateValidator.bind(this)]],
      image: [null, [this.imageValidator]],
      category_id: ['', Validators.required]
    });
  }

  endDateValidator(control: FormControl): { [key: string]: boolean } | null {
    const startDate = this.addEventForm?.get('start_date')?.value;
    const endDate = control.value;
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { 'endDateInvalid': true };
    }
    return null;
  }

  imageValidator(control: FormControl): { [key: string]: boolean } | null {
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

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.addEventForm.patchValue({
        image: file
      });
    }
  }

  onSubmit(): void {
    if (this.addEventForm.valid) {
      const newEvent = this.addEventForm.value;
      
      if (newEvent.image) {
        const reader = new FileReader();
        reader.onload = () => {
          newEvent.image = reader.result;
          this.dataService.addEvent(newEvent);
          this.modal.close(newEvent);
        };
        reader.readAsDataURL(newEvent.image);
      } else {
        this.dataService.addEvent(newEvent);
        this.modal.close(newEvent);
      }
    }
  }
}