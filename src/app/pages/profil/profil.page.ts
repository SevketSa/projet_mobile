import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {UploadFileComponent} from '../../modals/upload-file/upload-file.component';
import {AngularFireStorage} from '@angular/fire/compat/storage';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  public email : string;
  public firstname : string;
  public lastname : string;
  public phone : boolean;
  public profilPicture : any;
  public ionicForm : FormGroup;
  private userUid: string;

  constructor(public formBuilder: FormBuilder,
              private authentication: AuthenticationService,
              public modalController: ModalController,
              public angularFireStorage : AngularFireStorage) { }

  ngOnInit() {
    this.authentication.getUser().subscribe(user => {
      this.userUid = user.uid
      this.authentication.getUserFirestore().subscribe(userF => {
        this.email = userF.email;
        this.firstname = userF.firstname;
        this.lastname = userF.lastname;
        this.phone = userF.phone;
        this.profilPicture = this.angularFireStorage.ref(`${user.uid}`).getDownloadURL();
      });
    });
    this.ionicForm = new FormGroup({
      email : new FormControl({value: this.email, disabled: true}),
      firstname : new FormControl(),
      lastname : new FormControl(),
      phone : new FormControl()
    });
  }

  updateProfil() {
    this.authentication.updateUser(this.ionicForm.getRawValue());
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: UploadFileComponent,
      componentProps: {
        "userUid": this.userUid
      }
    });

    modal.onDidDismiss().then(() => {});

    return await modal.present();
  }
}
