import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, updateProfile, UserInfo } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { async } from '@firebase/util';
import {switchMap, Observable, from, of, concatMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);
  constructor(private auth: Auth) { }
  signUp(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }
  login(email: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
      const user = this.auth.currentUser;
      return of(user).pipe(
        concatMap(user => {
          if(!user) throw new Error('Not authenticated');
          return updateProfile(user, profileData);
        })
      ) 
  }
  logout() {
    return from(this.auth.signOut());
  }
}
