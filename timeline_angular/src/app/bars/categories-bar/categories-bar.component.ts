import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeCategoryColorModalComponent } from '../../modals/change-category-color-modal/change-category-color-modal.component';
import { ChangeCategoryNameModalComponent } from '../../modals/change-category-name-modal/change-category-name-modal.component';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Category } from '../../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-bar.component.html',
  styleUrl: './categories-bar.component.css'
})
export class CategoriesBarComponent implements OnInit, AfterViewChecked {
  categories: Category[] = [];
  areAllCardsExpanded: boolean = false;
  activeCategoryId: number | null = null;  
  private shouldPrint = false;
  isLoggedIn$!: Observable<boolean>;
  isTimelineView: boolean = true;

  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;

    this.dataService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.dataService.viewMode$.subscribe(mode => {
      this.isTimelineView = mode === 'timeline';
    });
  }

  toggleCards() {
    this.areAllCardsExpanded = !this.areAllCardsExpanded;
    this.dataService.setCardsExpandedState(this.areAllCardsExpanded);
  }

  printView() {
    Promise.resolve().then(() => {
      this.dataService.setCardsExpandedState(true);
      this.shouldPrint = true;
      this.cdr.detectChanges();
    });
  }

  ngAfterViewChecked() {
    if (this.shouldPrint) {
      this.shouldPrint = false;
      window.print();
      Promise.resolve().then(() => {
        this.dataService.setCardsExpandedState(false);
        this.cdr.detectChanges();
      });
    }
  }

  deleteCategory(categoryId: number) {
    const categoryInUse = this.dataService.isCategoryInUse(categoryId);
    if (categoryInUse) {
      alert('Ta kategoria jest przypisana do wydarzenia i nie można jej usunąć');
    } else {
      if (confirm('Czy na pewno chcesz usunąć tę kategorię?')) {
        this.dataService.deleteCategory(categoryId);
        this.dataService.getCategories().subscribe(categories => {
          this.categories = categories;
        });      }
    }
  }

  filterEvents(categoryId: number): void {
    if (this.activeCategoryId === categoryId) {
      this.activeCategoryId = null;
      this.dataService.setActiveCategoryFilter(null);
    } else {
      this.activeCategoryId = categoryId;
      this.dataService.setActiveCategoryFilter(categoryId);
    }
  }

  openChangeCategoryColorModal(categoryId: number): void {
    const modalRef = this.modalService.open(ChangeCategoryColorModalComponent);
    modalRef.componentInstance.setCategoryId(categoryId);
    modalRef.result.then((color) => {
      if (color) {
        this.dataService.updateCategoryColor(categoryId, color);
        this.dataService.getCategories().subscribe(categories => {
          this.categories = categories;
        });
      }
    });
  }

  openChangeCategoryNameModal(categoryId: number): void {
    const modalRef = this.modalService.open(ChangeCategoryNameModalComponent);
    modalRef.componentInstance.setCategoryId(categoryId.toString());
    modalRef.result.then((name) => {
      if (name) {
        this.dataService.updateCategoryName(categoryId, name);
        this.dataService.getCategories().subscribe(categories => {
          this.categories = categories;
        });
      }
    });
  }
}
