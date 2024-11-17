import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-mode-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-mode-bar.component.html',
  styleUrl: './view-mode-bar.component.css'
})
export class ViewModeBarComponent implements OnInit {
  viewMode$!: Observable<'timeline' | 'table'>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.viewMode$ = this.dataService.viewMode$;
  }

  toggleViewMode(): void {
    const currentMode = this.dataService.getViewMode();
    this.dataService.setViewMode(currentMode === 'timeline' ? 'table' : 'timeline');
  }
}