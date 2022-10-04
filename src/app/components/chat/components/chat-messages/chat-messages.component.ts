import { Component, Input, OnInit } from '@angular/core';
import { UserInfo, MessageInfo } from '../../types';

@Component({
  selector: 'chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {

	// @Input() contact?: { name: string; image?: string };
	@Input() contact?: UserInfo;
	@Input() messages?: Array<MessageInfo>;
	@Input() onSend?: (message: string) => void;

	disable = false;

	message: string | null = '';
	onChange(event: any) {
		this.message = event.target.value;
	}
	onSubmit(event: any) {
		this.onSend && this.onSend(this.message ?? '');
		this.message = null;
	}

	constructor() {
		this.disable = this.contact === undefined;
	}

	ngOnInit(): void {
	}

}
