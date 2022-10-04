import { Component, Input, OnInit } from '@angular/core';
import { MessagesType } from '../../types/messages.type';

@Component({
  selector: 'chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {

	@Input() contact?: { name: string; image?: string };
	@Input() messages?: Array<MessagesType>;

	constructor() { }

	ngOnInit(): void {
	}

}
