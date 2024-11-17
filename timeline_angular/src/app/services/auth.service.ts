import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  currentUser$ = this.currentUserSubject.asObservable();
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    const storedUser = this.getUserFromStorage();
    if (storedUser) {
      this.currentUserSubject.next(storedUser);
      this.isLoggedInSubject.next(true);
    }
  }

  private getUserFromStorage(): User | null {
    const userJson = sessionStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  login(user: User): void {
    const userToStore = {
      ...user,
      password: undefined
    };
    sessionStorage.setItem('currentUser', JSON.stringify(userToStore));
    this.currentUserSubject.next(user);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}