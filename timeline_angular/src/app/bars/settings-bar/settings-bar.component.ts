import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoryModalComponent } from '../../modals/add-category-modal/add-category-modal.component';
import { AddEventModalComponent } from '../../modals/add-event-modal/add-event-modal.component';

@Component({
  selector: 'app-settings-bar',
  standalone: true,
  imports: [],
  templateUrl: './settings-bar.component.html',
  styleUrl: './settings-bar.component.css'
})
export class SettingsBarComponent {
  isLoggedIn: boolean = true; // Replace with actual authentication logic

  constructor(private modalService: NgbModal) {
    // Replace with actual authentication check
    this.isLoggedIn = true; // Example: Set to true for demonstration
  }

  openAddCategoryModal(): void {
    const modalRef = this.modalService.open(AddCategoryModalComponent);
    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });
  }

  openAddEventModal(): void {
    const modalRef = this.modalService.open(AddEventModalComponent);
    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });
  }
}