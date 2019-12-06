import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';
import { LoginUser } from '../LoginUser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    submitMessage: string;
    loginUser: LoginUser;
    username = new FormControl();
    password = new FormControl();

    constructor(private routerService: RouterService, private authService: AuthenticationService) {
      this.submitMessage = '';
      this.loginUser = new LoginUser;
    }

    loginSubmit() {
      this.submitMessage = '';
      this.loginUser.username = this.username.value;
      this.loginUser.password = this.password.value;
  
      this.authService.authenticateUser(this.loginUser).subscribe(
        resp => {
          this.authService.setBearerToken(resp['token']);
          this.routerService.routeToDashboard();
        }, err => {
          this.submitMessage = err.message;
          if (err.status === 403) {
            this.submitMessage = 'Unauthorized';
          } else {
            this.submitMessage = 'Http failure response for http://localhost:3000/auth/v1: 404 Not Found';
          }
        }
      );
    }
}
