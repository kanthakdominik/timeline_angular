import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-category-name-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-category-name-modal.component.html',
  styleUrl: './change-category-name-modal.component.css'
})
export class ChangeCategoryNameModalComponent implements OnInit, AfterViewInit {
  changeNameForm!: FormGroup;
  private categoryId: string | null = null;

  constructor(public modal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.changeNameForm = this.fb.group({
      category_id: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    if (this.categoryId) {
      this.setCategoryId(this.categoryId);
    }
  }

  setCategoryId(categoryId: string): void {
    this.categoryId = categoryId;
    if (this.changeNameForm) {
      this.changeNameForm.patchValue({ category_id: categoryId });
      console.log('Patched Category ID:', this.changeNameForm.get('category_id')?.value);
    }
  }

  onSubmit(): void {
    if (this.changeNameForm.valid) {
      this.modal.close(this.changeNameForm.value.name);
    }
  }
}
