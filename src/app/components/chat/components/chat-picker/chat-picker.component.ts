import { Component, Input, OnInit } from '@angular/core';
import { ChatType } from '../../types/chat.type';

@Component({
  selector: 'chat-picker',
  templateUrl: './chat-picker.component.html',
  styleUrls: ['./chat-picker.component.css']
})
export class ChatPickerComponent implements OnInit {
	@Input()
	people?: ChatType[];

	@Input()
	onSelect: (value: string) => void = () => {};

	constructor() { }

	ngOnInit(): void {
	}

}
