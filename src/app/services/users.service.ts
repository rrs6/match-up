import { ProfileUser } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable, OnInit } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { combineLatest, filter, from, map, Observable, of, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService{
  user$ = this.currentUserProfile$;
  userss = combineLatest([this.allUsers$, this.user$]).pipe(map(([users, user]) => users.filter(u => (u.uid !== user?.uid) && (u.listOfLikes?.filter((uid)=>uid == user?.uid)))));
  tags: string[] = ["Futebol, Tik-Tok, Viajar, Maquiagem, Treino, Esportes, Filmes&Series"];
  constructor(private firestore: Firestore, private authService: AuthenticationService) {}
  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }
  get allUsers$(): Observable<ProfileUser[]> {
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<ProfileUser[]>;
  }
  addUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(updateDoc(ref, { ...user }));
  }

  likeUser(user: ProfileUser, uid: string): Observable<void> {
    if(!user.listOfLikes){
      user.listOfLikes = [];
      user.listOfLikes.push(uid);
    }else if(!user.listOfLikes.find((like) => like==uid)){
      user.listOfLikes.push(uid);
    }
    const ref1 = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref1, { ...user }));
  }
}