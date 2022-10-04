import { Component, OnInit } from '@angular/core';
import { ChatType } from './types/chat.type';
import { MessagesType } from './types/messages.type';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	chats: ChatType[] = [
		{
			name: 'The Rock',
			image: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg'
		},
		{
			name: 'Gisele Bündchen',
		},
		{
			name: 'Terry Crews',
			image: 'https://api.time.com/wp-content/uploads/2017/12/terry-crews-person-of-year-2017-time-magazine-2.jpg',
		},
	];

	messages: MessagesType[] = [
		{
			sender: "The Rock",
			time: new Date(),
			content: "Iae cara, blz?"
		},
		{
			sender: "Gabriel",
			time: new Date(),
			content: "Blz, e vc?"
		},
		{
			sender: "The Rock",
			time: new Date(),
			content: "Comigo tbm!"
		},
		{
			sender: "Gabriel",
			time: new Date(),
			content: "Massa!"
		},
		{
			sender: "Gabriel",
			time: new Date(),
			content: "Vai fazer alguma coisa nesse sábado a tarde?"
		},
		{
			sender: "The Rock",
			time: new Date(),
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
			sender: "Gabriel",
			time: new Date(),
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
	];

	Test: string = "testing...";
	handleSelect = (value: string) => {
		console.log(value);
		this.Test = value;
	};

	constructor() { }

	ngOnInit(): void {
	}

}

