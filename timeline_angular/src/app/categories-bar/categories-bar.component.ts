import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  editCategoryName(categoryId: number) {
    // Implement edit category name logic
  }

  editCategoryColor(categoryId: number) {
    // Implement edit category color logic
  }

  deleteCategory(categoryId: number) {
    // Implement delete category logic
  }
}
