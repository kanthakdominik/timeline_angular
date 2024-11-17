import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddCategoryModalComponent implements OnInit {
  addCategoryForm!: FormGroup;

  constructor(
    public modal: NgbActiveModal, 
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      name: ['', Validators.required],
      color: ['#4A628A', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addCategoryForm.valid) {
      const newCategory: Category = {
        id: this.dataService.getNextCategoryId(),
        name: this.addCategoryForm.value.name,
        color: this.addCategoryForm.value.color
      };

      this.dataService.addCategory(newCategory);
      this.modal.close();
    }
  }

  onClose(): void {
    this.modal.dismiss();
  }
}