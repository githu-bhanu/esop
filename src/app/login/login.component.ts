import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'esop-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  email: string = '';
  isForgotPassword: boolean = false;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.router.navigate(['/app/dashboard']);
    // this.appService.login({ username: this.username, password: this.password })
    //   .subscribe(
    //     response => {
    //       alert('Login successful!');
    //       this.router.navigate(['/dashboard']);
    //     },
    //     error => {
    //       alert('Login failed. Please try again.');
    //     }
    //   );
  }

  onForgotPassword(): void {
    this.isForgotPassword = true;
  }

  backToLogin() {
    this.isForgotPassword = false;
  }

  onResetPassword(): void {
    return;
    // this.appService.resetPassword({ email: this.email })
    //   .subscribe(
    //     response => {
    //       alert('Password reset email sent!');
    //       this.isForgotPassword = false;
    //     },
    //     error => {
    //       alert('Failed to send reset email. Please try again.');
    //     }
    //   );
  }
}