import { UsersService } from 'src/app/services/users.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';
import { UserProfile } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user$ = this.authService.currentUser$;
  
  //userss = this.userService.allUsers$;

  
  // usuarioLogado = combineLatest([this.userService.allUsers$, this.user$]).pipe(map(([users, user]) => users.find(u => (u.uid == user?.uid))));

  userss = combineLatest([this.userService.allUsers$, this.user$]).pipe(map(([users, user]) => users.filter(u => (u.uid !== user?.uid) && (u.futebol == (users.find(u => (u.uid == user?.uid)))?.futebol))));
  constructor(private authService: AuthenticationService, private userService: UsersService) { }

  ngOnInit(): void {
    
  }

}
