import { Component, EventEmitter, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TResponseData } from './register.interface';

interface LoginResponse {
  data: any;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [FormsModule, CommonModule],
})
export class RegisterComponent {
  userCreated = output<boolean>();
  currentForm: string = 'login';
  // isUserAvailable: boolean = false;

  user = {
    password: '',
    member: {
      name: '',
      email: '',
      phone: '',
    },
  };

  loginData: { email: string; password: string } = {
    email: '',
    password: '',
  };

  // ফর্ম টগল করার জন্য
  toggleForm(formType: string) {
    this.currentForm = formType;
  }

  // Login ফর্ম সাবমিশন হ্যান্ডলার
  onLoginSubmit(event: Event) {
    event.preventDefault();
    const apiUrl = 'http://localhost:5000/api/v1/auth/login';
    this.http.post<LoginResponse>(apiUrl, this.loginData).subscribe({
      next: (response) => {
        const { accessToken } = response?.data;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          this.userCreated.emit(true);
        }
      },
      error: (error) => console.error('Error:', error),
    });
  }

  constructor(private http: HttpClient) {}

  onRegisterSubmit(event: Event) {
    event.preventDefault();
    const apiUrl = 'http://localhost:5000/api/v1/user/create-member';

    this.http.post(apiUrl, this.user).subscribe({
      next: (response) => {
        // this.userCreated.emit(true);

        // সাইন আপ সফল হলে লগইন API কল করা হবে
        const apiUrl2 = 'http://localhost:5000/api/v1/auth/login';
        this.http
          .post<LoginResponse>(apiUrl2, {
            email: this.user.member.email,
            password: this.user.password,
          })
          .subscribe({
            next: (response) => {
              const { accessToken } = response?.data;
              if (accessToken) {
                // accessToken যদি পাওয়া যায়, তাহলে সেটি localStorage এ সেভ করা হবে
                localStorage.setItem('accessToken', accessToken);
                console.log('Login successful and user logged in!');
                this.userCreated.emit(true); // Event emit if needed
              }
            },
            error: (error) => {
              console.error('Login failed:', error);
            },
          });
      }, // next callback

      error: (error) => console.error('Errorsss:', error), // error callback
      complete: () => console.log('Complete'), // complete callback
    });
  }
}
