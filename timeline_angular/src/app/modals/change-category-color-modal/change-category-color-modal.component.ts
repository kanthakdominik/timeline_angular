import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-category-color-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-category-color-modal.component.html',
  styleUrl: './change-category-color-modal.component.css'
})
export class ChangeCategoryColorModalComponent implements OnInit {
  changeColorForm!: FormGroup;
  private categoryId: number | null = null;

  constructor(
    public modal: NgbActiveModal, 
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.changeColorForm = this.fb.group({
      category_id: ['', Validators.required],
      color: ['#4A628A', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    if (this.categoryId) {
      this.setCategoryId(this.categoryId);
    }
  }
  
  setCategoryId(categoryId: number): void {
    this.categoryId = categoryId;
    if (this.changeColorForm) {
      this.changeColorForm.patchValue({ category_id: categoryId });
    }
  }
  
  onSubmit(): void {
    if (this.changeColorForm.valid) {
      this.modal.close(this.changeColorForm.value.color);
    }
  }
}
