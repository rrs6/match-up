import { Injectable } from '@angular/core';
import {Storage} from '@angular/fire/storage'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImgService {

  constructor(private storage: Storage) { }
  uploadImage(image: File, path: string): Observable<string> {
    const storageR = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageR, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}
