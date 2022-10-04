import { Component, Input, OnInit } from '@angular/core';
import { ChatType, UserInfo } from '../../types';

@Component({
  selector: 'chat-picker',
  templateUrl: './chat-picker.component.html',
  styleUrls: ['./chat-picker.component.css']
})
export class ChatPickerComponent implements OnInit {
	@Input()
	people?: ChatType[];

	@Input()
	onSelect: (value: ChatType) => void = () => {};

	constructor() { }

	ngOnInit(): void {
	}

}
