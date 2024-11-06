import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeCategoryColorModalComponent } from '../change-category-color-modal/change-category-color-modal.component';
import { ChangeCategoryNameModalComponent } from '../change-category-name-modal/change-category-name-modal.component';

interface Category {
  id: number;
  name: string;
  color: string;
}

@Component({
  selector: 'app-categories-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-bar.component.html',
  styleUrl: './categories-bar.component.css'
})
export class CategoriesBarComponent {
  constructor(private modalService: NgbModal) {}

  isLoggedIn: boolean = true; // Replace with actual authentication logic
  categories: Category[] = [
    { id: 1, name: 'Category 1', color: '#ff0000' },
    { id: 2, name: 'Category 2', color: '#00ff00' },
    { id: 3, name: 'Category 3', color: '#0000ff' }
  ]; // Replace with actual categories data

  // Implement methods for button actions
  toggleCards() {
    // Implement toggle cards logic
  }

  printView() {
    // Implement print view logic
  }
  
  deleteCategory(categoryId: number) {
    // Implement delete category logic
  }

  openChangeCategoryColorModal(categoryId: number): void {
    const modalRef = this.modalService.open(ChangeCategoryColorModalComponent);
    modalRef.componentInstance.setCategoryId(categoryId);
    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });
  }

  openChangeCategoryNameModal(categoryId: number): void {
    const modalRef = this.modalService.open(ChangeCategoryNameModalComponent);
    modalRef.componentInstance.setCategoryId(categoryId.toString());
    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });
  }
}
