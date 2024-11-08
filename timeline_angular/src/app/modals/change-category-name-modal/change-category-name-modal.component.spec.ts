import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCategoryNameModalComponent } from './change-category-name-modal.component';

describe('ChangeCategoryNameModalComponent', () => {
  let component: ChangeCategoryNameModalComponent;
  let fixture: ComponentFixture<ChangeCategoryNameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeCategoryNameModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCategoryNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
