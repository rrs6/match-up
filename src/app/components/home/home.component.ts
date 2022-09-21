import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user$ = this.authService.currentUser$;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
