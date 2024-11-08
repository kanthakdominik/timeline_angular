import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCategoryColorModalComponent } from './change-category-color-modal.component';

describe('ChangeCategoryColorModalComponent', () => {
  let component: ChangeCategoryColorModalComponent;
  let fixture: ComponentFixture<ChangeCategoryColorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeCategoryColorModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCategoryColorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
