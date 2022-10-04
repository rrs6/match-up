import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore';

import { app } from './index';
import { ProfileUser } from '../../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  auth = getAuth(app);
  
  getUser() {
	return this.auth.currentUser;
  }

  getUid() {
	return this.auth.currentUser?.uid ?? '';
  }

  async getData(uid: string) {
	let db = getFirestore(app);
	let document = doc(db, 'users', uid);
	let snapshot = await getDoc(document);
	return snapshot.data() as ProfileUser;
  }
}
