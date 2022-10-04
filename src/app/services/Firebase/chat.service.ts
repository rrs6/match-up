import { Injectable } from '@angular/core';
import { getFirestore, collection, doc, setDoc, query, where, getDocs, getDoc, updateDoc, arrayUnion, Timestamp, onSnapshot } from 'firebase/firestore';
import { app } from './index';
import { User } from './types';
import { ChatInfo, FileInfo, MessageInfo, PartialMessageInfo, UserInfo, ChatType } from './types';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
	
  constructor() { }
	
  firestore = getFirestore(app);

  async createChat(sender: User, receiver: User) {
	let messages = collection(this.firestore, "messages");

	let existsQuery = query(
		messages,
		where('owners', 'array-contains', sender.id),
	);
	
	let exists = false
	let existsDoc = await getDocs(existsQuery);
	existsDoc.forEach(result => {
		let resultDoc = result.data() as ChatInfo;

		console.log(resultDoc.id);
		if (resultDoc.owners.find(el => el === receiver.id)) {
			exists = true;
			console.log(exists);
		}
	})
	
	console.log(exists);
	if (!exists) {	
		let document = doc(messages);
		let senderDoc = doc(collection(document, sender.id));
		let receiverDoc = doc(collection(document, receiver.id));

		setDoc(senderDoc, { messages: [] });
		setDoc(receiverDoc, { messages: [] });
		
		setDoc(
			document,
			{
				owners: [sender.id, receiver.id],
				details: {
					[sender.id]: {
						...sender,
						file: senderDoc.id,
					},
					[receiver.id]: {
						...receiver,
						file: receiverDoc.id
					},
				},
				id: document.id,
			},
		);
	}
  }

  async getChats(owner: string) {
	let list = query(
		collection(this.firestore, "messages"),
		where("owners", "array-contains", owner),
	);

	let dataset = await getDocs(list);
	let results: Array<ChatType> = [];
	dataset.forEach(document => {
		let data = document.data() as ChatInfo;

		let user = data.owners[0] === owner ? data.owners[1] : data.owners[0];

		results.push({
			chat: data.id,
			file: data.details[owner].file,
			user: data.details[user],
		});
	});

	return results;
  }

  listenToMessages(chat: string, owner: string, file: string, update: (message: MessageInfo) => void) {
	onSnapshot(doc(this.firestore, "messages", chat, owner, file), async (snapshot) => {
		let data = snapshot.data() as FileInfo;
		let message = data.messages[data.messages.length - 1];

		update({
			...message,
			time: new Date((message.time as Timestamp).toDate()),
		});
	});
  }

  async readMessages(chat: string) {
	let snapshot = await getDoc(doc(this.firestore, "messages", chat));

	let data = snapshot.data() as ChatInfo;

	let partialMessages: Array<PartialMessageInfo> = [];
	for (let owner of data.owners) {
		let messageSnapshot = await getDoc(
			doc(
				this.firestore,
				"messages",
				chat,
				owner,
				data.details[owner].file
			)
		);

		let messageData = messageSnapshot.data() as FileInfo;
		partialMessages.push(...messageData.messages);
	}

	let messages: Array<MessageInfo> = partialMessages.map(element => ({
		...element,
		time: new Date((element.time as Timestamp).toDate()),
	}));

	messages.sort((a, b) => {
		if (a.time < b.time) {
			return -1;
		}else if (a.time > b.time) {
			return 1;
		}else {
			return 0;
		}
	});

	return {
		messages,
		files: [
			data.details[data.owners[0]].file,
			data.details[data.owners[1]].file,
		]
	};
  }

  async sendMessage(chat: string, owner: string, file: string, message: string) {
	let document = doc(
		collection(this.firestore, "messages"),
		chat,
		owner,
		file
	);

	let snapshot = await getDoc(document);
	let data = snapshot.data() as FileInfo;

	let MessageData: MessageInfo = {
		content: message,
		sender: owner,
		time: new Date(),
	};

	// if (data.messages.length === 10) {
	if (false) {
		let newDoc = doc(
			collection(this.firestore, "messages"),
			chat,
			owner,
		);
		let newData: FileInfo = {
			messages: [ MessageData ],
			previous: document.id,
		}

		await setDoc(newDoc, newData);
		updateDoc(
			doc(this.firestore, "messages", chat),
			{
				[`details.${owner}.file`]: newDoc.id,
			}
		);
	} else {
		updateDoc(
			document,
			{
				messages: arrayUnion(MessageData),
			}
		)
	}

	return MessageData;
  }
}

