import { UsersService } from './../../services/users.service';
import { ProfileUser } from 'src/app/models/user-profile';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  cardInfo: ProfileUser | any;
  constructor(private userService: UsersService) { }
  uid?: string;

  ngOnInit(): void {
    this.userService.currentUserProfile$.subscribe((user) => this.uid=user?.uid);
  }
  like()  {
    this.userService.likeUser({...this.cardInfo}, this.uid!);
  }
}
