import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
	@ViewChild('ChatScroll') private myScrollContainer?: ElementRef;

	test = false;

	message: string | null = '';
	onChange(event: any) {
		this.message = event.target.value;
	}
	onSubmit(event: any) {
		this.onSend && this.onSend(this.message ?? '');
		this.message = null;
	}

	constructor() { }

    ngOnInit() { 
        this.scrollToBottom();
		console.log('init')
    }

    ngAfterViewChecked() {        
        this.scrollToBottom();        
    } 

    scrollToBottom(): void {
        try {
            if (this.myScrollContainer) {
				this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
			}
        } catch(err) { }                 
    }

	ngOnChanges(changes: SimpleChanges): void {
		this.test = !this.test;
		console.log(changes);
		console.log(this.test);
		console.log(this.messages);
	}

}
