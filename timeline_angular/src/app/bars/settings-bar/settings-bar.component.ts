import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoryModalComponent } from '../../modals/add-category-modal/add-category-modal.component';
import { AddEventModalComponent } from '../../modals/add-event-modal/add-event-modal.component';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-bar.component.html',
  styleUrl: './settings-bar.component.css'
})
export class SettingsBarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  openAddCategoryModal(): void {
    this.modalService.open(AddCategoryModalComponent);
  }

  openAddEventModal(): void {
    this.modalService.open(AddEventModalComponent);
  }
}