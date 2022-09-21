import { UsersService } from './services/users.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthenticationService, private router: Router, private userService: UsersService) { }
  user$ = this.userService.currentUserProfile$;
  logout() {
    this.authService.logout().subscribe( () => {
      this.router.navigate(['']);
    });
  }
}
