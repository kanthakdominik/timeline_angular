import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-event-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-event-modal.component.html',
  styleUrl: './add-event-modal.component.css'
})
export class AddEventModalComponent implements OnInit {
  addEventForm!: FormGroup;
  categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' }
    // Add your categories here
  ];

  constructor(public modal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addEventForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      image: [null],
      category_id: ['', Validators.required]
    });
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
      // Handle form submission
      console.log(this.addEventForm.value);
      this.modal.close(this.addEventForm.value);
    }
  }
}