import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainBarComponent } from '../../bars/main-bar/main-bar.component';
import { TimelineValidators } from '../../validators/validators';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainBarComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required]
    }, {
      validators: TimelineValidators.passwordMatch
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      if (this.dataService.getUserByEmail(email)) {
        this.errorMessage = 'Ten adres email jest już zajęty';
        return;
      }

      const newUser: User = {
        id: this.dataService.getNextUserId(),
        name,
        email,
        password,
        created_at: new Date(),
        updated_at: new Date()
      };

      this.dataService.addUser(newUser);
      this.authService.login(newUser);
      this.successMessage = 'Rejestracja zakończona pomyślnie!';
      this.registerForm.reset();
      this.router.navigate(['/'], {
        state: { message: 'Rejestracja zakończona pomyślnie!' }
      });
    }
  }
}
