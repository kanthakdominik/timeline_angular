import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainBarComponent } from '../../bars/main-bar/main-bar.component';
import { TimelineValidators } from '../../validators/validators';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MainBarComponent
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {
    this.changePasswordForm = this.fb.group({
      current_password: ['', [Validators.required]],
      new_password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]],      new_password_confirmation: ['', Validators.required]
    }, {
      validators: TimelineValidators.passwordMatch
    });
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
        if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (this.changePasswordForm.valid && this.currentUser) {
      const { current_password, new_password } = this.changePasswordForm.value;
      this.successMessage = null;
      this.errorMessage = null;

      if (!this.dataService.verifyPassword(current_password, this.currentUser.password)) {
        this.errorMessage = 'Aktualne hasło jest nieprawidłowe';
        return;
      }

      try {
        this.dataService.updatePassword(this.currentUser.id, new_password);
        const updatedUser = this.dataService.getUserById(this.currentUser.id);
        
        if (updatedUser) {
          this.authService.login(updatedUser);
        }
        this.successMessage = 'Hasło zostało zmienione pomyślnie!';
        this.changePasswordForm.reset();
        
        timer(1000).pipe(take(1)).subscribe(() => {
          this.router.navigate(['/']);
        });
      } catch (error) {
        this.errorMessage = 'Wystąpił błąd podczas zmiany hasła';
      }
    }
  }
}
