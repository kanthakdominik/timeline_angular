import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeCategoryColorModalComponent } from '../../modals/change-category-color-modal/change-category-color-modal.component';
import { ChangeCategoryNameModalComponent } from '../../modals/change-category-name-modal/change-category-name-modal.component';
import { DataService } from '../../services/data-service.service';
import { ToggleService } from '../../services/toggle.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-categories-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-bar.component.html',
  styleUrl: './categories-bar.component.css'
})
export class CategoriesBarComponent implements OnInit {
  categories: Category[] = [];
  areAllCardsToggled: boolean = false;
  isLoggedIn: boolean = true; // Replace with actual authentication logic

  constructor(
    private modalService: NgbModal, 
    private dataService: DataService,
    private toggleService: ToggleService
  ) {}

  ngOnInit(): void {
    this.categories = this.dataService.getCategories();
  }

  toggleCards() {
    this.areAllCardsToggled = !this.areAllCardsToggled;
    this.toggleService.toggleAllCards(this.areAllCardsToggled);
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
      if (result) {
        this.dataService.updateCategory(result);
        this.categories = this.dataService.getCategories();
      }
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });
  }

  openChangeCategoryNameModal(categoryId: number): void {
    const modalRef = this.modalService.open(ChangeCategoryNameModalComponent);
    modalRef.componentInstance.setCategoryId(categoryId.toString());
    modalRef.result.then((result) => {
      if (result) {
        this.dataService.updateCategory(result);
        this.categories = this.dataService.getCategories();
      }
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });
  }
}
