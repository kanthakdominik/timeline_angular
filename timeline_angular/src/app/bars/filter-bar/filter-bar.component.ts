import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

type SortField = 'name' | 'start_date' | 'end_date' | 'category';
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent {
  currentSort: SortField = 'name';
  sortDirection: SortDirection = 'asc';
  filterStartDate: string = '';
  filterEndDate: string = '';

  constructor(private dataService: DataService) {}

  sortBy(field: SortField): void {
    if (this.currentSort === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort = field;
      this.sortDirection = 'asc';
    }

    this.dataService.setSortConfig({ field: this.currentSort, direction: this.sortDirection });
  }

  getSortIcon(field: SortField): string {
    if (this.currentSort !== field) return 'bi-arrow-down-up';
    return this.sortDirection === 'asc' ? 'bi-sort-down' : 'bi-sort-up';
  }

  onDateFilterChange(): void {
    this.dataService.setDateFilter({
      startDate: this.filterStartDate ? new Date(this.filterStartDate) : null,
      endDate: this.filterEndDate ? new Date(this.filterEndDate) : null
    });
  }

  resetStartDate(): void {
    this.filterStartDate = '';
    this.onDateFilterChange();
  }

  resetEndDate(): void {
    this.filterEndDate = '';
    this.onDateFilterChange();
  }
}
