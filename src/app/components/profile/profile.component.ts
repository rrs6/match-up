import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, tap } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';
import { UploadImgService } from 'src/app/services/upload-img.service';
import {MatRadioModule} from '@angular/material/radio';
import { UsersService } from 'src/app/services/users.service';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

  profileForm = this.fb.group({
    uid: [''],
    displayName: [''],
    firstname: [''],
    lastname: [''],
    phone: [''],
    address: [''],
    age: [],
    gender: [''],
    futebol: false,
    games: false,
    cinema: false,
    gardening: false,
    food: false,
  });

  constructor(
    private imageUploadService: UploadImgService,
    private toast: HotToastService,
    private usersService: UsersService,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
    
  }

  uploadImage(event: any, { uid }: ProfileUser) {
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        switchMap((photoURL) =>
          this.usersService.updateUser({
            uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }

  saveProfile() {
    const { uid, ...data } = this.profileForm.value;

    if (!uid) {
      return;
    }

    this.usersService
      .updateUser({ uid, ...data })
      .pipe(
        this.toast.observe({
          loading: 'Saving profile data...',
          success: 'Profile updated successfully',
          error: 'There was an error in updating the profile',
        })
      )
      .subscribe();
  }
  hello(event: Event):void {
    console.log(event);
  }

  public onFutebolChanged(value:boolean){
    this.profileForm.value.futebol = value;
  }
  public onGamesChanged(value:boolean){
    this.profileForm.value.games = value;
  }
  public onCinemaChanged(value:boolean){
    this.profileForm.value.cinema = value;
  }
  public onGardeningChanged(value:boolean){
    this.profileForm.value.gardening = value;
  }
  public onFoodChanged(value:boolean){
    this.profileForm.value.food = value;
  }
}
