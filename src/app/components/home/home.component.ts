import { UsersService } from 'src/app/services/users.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, Input, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';
import { user, UserProfile } from '@angular/fire/auth';
import { ChatService } from 'src/app/services/Firebase/chat.service';
import { AuthService } from 'src/app/services/Firebase/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user$ = this.userService.currentUserProfile$;

  userss = combineLatest([this.userService.allUsers$, this.user$]).pipe(map(([users, user]) => users.filter(u => (u.uid !== user?.uid) && 
      
      (+(u.futebol == user?.futebol) +
      +(u.games == user?.games) +
      +(u.cinema== user?.cinema) +
      +(u.gardening== user?.gardening) +
      +(u.food== user?.food)) > 3

      )));

  constructor(private authService: AuthenticationService, private userService: UsersService, private chatService: ChatService, private customAuth: AuthService) { }
  ngOnInit(): void {
    this.userService.userss.subscribe(async (allUsers) => {
		console.log(allUsers);
		let sender = await this.customAuth.getData(this.customAuth.getUid());
		for (let receiver of allUsers) {
			console.log(receiver.uid);
			this.chatService.createChat(
				{
					id: sender.uid,
					name: sender.displayName ?? '',
				},
				{
					id: receiver.uid,
					name: receiver.displayName ?? '',
				},
			);
		}
	})
  }

}

