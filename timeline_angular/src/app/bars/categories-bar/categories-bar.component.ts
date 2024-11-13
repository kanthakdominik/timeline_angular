import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeCategoryColorModalComponent } from '../../modals/change-category-color-modal/change-category-color-modal.component';
import { ChangeCategoryNameModalComponent } from '../../modals/change-category-name-modal/change-category-name-modal.component';
import { DataService } from '../../services/data-service.service';
import { EventService } from '../../services/event.service';
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
  activeCategoryId: number | null = null;
  isLoggedIn: boolean = true; // Replace with actual authentication logic

  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    private eventService: EventService,
    private renderer: Renderer2

  ) { }

  ngOnInit(): void {
    this.categories = this.dataService.getCategories();
  }

  toggleCards() {
    this.areAllCardsToggled = !this.areAllCardsToggled;
    this.eventService.toggleAllCards(this.areAllCardsToggled);
  }

  printView() {
    const eventCards = document.querySelectorAll('.event-item');
    eventCards.forEach(card => {
      const elementsToToggle = card.querySelectorAll('.element-hidden');
      elementsToToggle.forEach(element => {
        this.renderer.setStyle(element, 'display', 'block');
      });
    });

    window.print();

    eventCards.forEach(card => {
      const elementsToToggle = card.querySelectorAll('.element-hidden');
      elementsToToggle.forEach(element => {
        this.renderer.setStyle(element, 'display', 'none');
      });
    });
  }

  deleteCategory(categoryId: number) {
    const categoryInUse = this.dataService.isCategoryInUse(categoryId);
    if (categoryInUse) {
      alert('Ta kategoria jest przypisana do wydarzenia i nie można jej usunąć');
    } else {
      if (confirm('Czy na pewno chcesz usunąć tę kategorię?')) {
      this.dataService.deleteCategory(categoryId);
      this.categories = this.dataService.getCategories();
      }
    }
  }

  filterEvents(categoryId: number): void {
    console.log('dfgh')
    if (this.activeCategoryId === categoryId) {
      this.activeCategoryId = null;
      this.eventService.filterEvents(null);
    } else {
      this.activeCategoryId = categoryId;
      this.eventService.filterEvents(categoryId);
    }
  }

  openChangeCategoryColorModal(categoryId: number): void {
    const modalRef = this.modalService.open(ChangeCategoryColorModalComponent);
    modalRef.componentInstance.setCategoryId(categoryId);
    modalRef.result.then((color) => {
      if (color) {
        this.dataService.updateCategoryColor(categoryId, color);
        this.categories = this.dataService.getCategories();
      }
    });
  }

  openChangeCategoryNameModal(categoryId: number): void {
    const modalRef = this.modalService.open(ChangeCategoryNameModalComponent);
    modalRef.componentInstance.setCategoryId(categoryId.toString());
    modalRef.result.then((name) => {
      if (name) {
        this.dataService.updateCategoryName(categoryId, name);
        this.categories = this.dataService.getCategories();
      }
    });
  }
}
