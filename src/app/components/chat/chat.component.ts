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
					// window.location.reload();
				},
			);
		};

		this.handleSend = (message: string) => {
			console.log(this.selected?.file);
			this.chatService.sendMessage(
				this.selected?.chat ?? '',
				this.authService.getUid(),
				this.selected?.file ?? '',
				message,
			).then(data => {
				this.messages.push(data);
			});
		}
		// this.chatService.readMessages()
		// this.chatService.createChat(
		// 	{
		// 		id: this.authService.getUser()?.uid ?? '',
		// 		name: this.authService.getUser()?.displayName ?? '',
		// 	},
		// 	{
		// 		id: 'id002',
		// 		name: 'The Rock',
		// 		image: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
		// 	}
		// );
		// this.chatService.getChats(this.authService.getUser()?.uid ?? '').then(data => {
		// 	console.log(data);
		// });
		// this.chatService.sendMessage(
		// 	'XNJfejBGOxt5tTrAylzB',
		// 	'J2gdq2ZmTDbkdZbOpMRM9ifk3VD2',
		// 	'kqXJ905KqArOM0wgiLus',
		// 	'Primeira mensagem enviada!'
		// );
		// this.chatService.sendMessage(
		// 	'XNJfejBGOxt5tTrAylzB',
		// 	'id002',
		// 	'kO5qPTny3VuLNsLQjC2C',
		// 	'Aparentemente tá funcionando!'
		// );
		// this.chatService.readMessages(
		// 	'k8XNvunP5a7W8PivUD7G',
		// ).then(data => {
		// 	if (data)
		// 	console.log(data);
		// });
	}

	ngOnInit(): void { }

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
	}

}

