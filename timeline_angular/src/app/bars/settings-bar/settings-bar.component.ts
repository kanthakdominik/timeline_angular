import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoryModalComponent } from '../../modals/add-category-modal/add-category-modal.component';
import { AddEventModalComponent } from '../../modals/add-event-modal/add-event-modal.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-settings-bar',
  standalone: true,
  imports: [],
  templateUrl: './settings-bar.component.html',
  styleUrl: './settings-bar.component.css'
})
export class SettingsBarComponent {
  isLoggedIn: boolean = true; // Replace with actual authentication logic

  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
  ) {}

  openAddCategoryModal(): void {
    const modalRef = this.modalService.open(AddCategoryModalComponent);
    modalRef.result.then((newCategory) => {
      if(newCategory) {
        this.dataService.addCategory(newCategory);
      }
    });
  }

  openAddEventModal(): void {
    const modalRef = this.modalService.open(AddEventModalComponent);
  }
}