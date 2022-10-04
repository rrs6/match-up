import { Timestamp } from 'firebase/firestore';

export type User = {
	id: string;
	name: string;
	image?: string;
}

export type UserInfo = {
	id: string;
	name: string;
	image?: string;
	file: string;
}

export type ChatType = {
	chat: string;
	file: string;
	user: UserInfo
}

export type ChatInfo = {
	owners: [string, string];
	details: {
		[key: string]: UserInfo;
	};
	id: string;
};

export type MessageInfo = {
	sender: string;
	time: Date;
	content: string; 
}

export type PartialMessageInfo = {
	sender: string;
	time: Timestamp | Date;
	content: string; 
}

export type FileInfo = {
	previous?: string;
	messages: Array<PartialMessageInfo>;
}
