import { ProfileUser } from 'src/app/models/user-profile';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  cardInfo?: ProfileUser;
  constructor() { }

  ngOnInit(): void {
    console.log(this.cardInfo?.photoURL);
  }

}
