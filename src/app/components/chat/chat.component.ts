import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ChatType, UserInfo, MessageInfo } from './types';

import { ChatService } from '../../services/Firebase/chat.service';
import { AuthService } from 'src/app/services/Firebase/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	chats: ChatType[] = [];
	messages: MessageInfo[] = [];
	selected?: ChatType;
	previous: string[] = [];

	handleSelect: (value: ChatType) => void;

	handleSend: (message: string) => void;

	constructor(private chatService: ChatService, private authService: AuthService) {
		this.chatService.getChats(this.authService.getUid()).then(
			data => {
				this.chats = data;
			}
		);

		this.handleSelect = (value) => {
			this.selected = value;
			this.chatService.readMessages(value.chat).then(data => {
				this.messages = data.messages;
				this.previous = data.files;
			});
			this.chatService.listenToMessages(
				value.chat,
				this.selected.user.id,
				this.selected.user.file,
				(update) => {
					this.messages.push(update);
					this.messages = [...this.messages];
				},
			);
		};

		this.handleSend = (message: string) => {
			this.chatService.sendMessage(
				this.selected?.chat ?? '',
				this.authService.getUid(),
				this.selected?.file ?? '',
				message,
			).then(data => {
				this.messages.push(data);
			});
		}
	}

	ngOnInit(): void { }

}

