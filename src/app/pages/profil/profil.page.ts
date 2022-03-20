import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {UploadFileComponent} from '../../modals/upload-file/upload-file.component';

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
  public profilPicture : string;
  public ionicForm : FormGroup;
  private userUid: string;

  constructor(public formBuilder: FormBuilder,
              private authentication: AuthenticationService,
              public modalController: ModalController) { }

  ngOnInit() {
    this.authentication.getUserFirestore().subscribe(user => {
      this.email = user.email;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.phone = user.phone;
      this.profilPicture = user.profilPicture;
    });
    this.ionicForm = new FormGroup({
      email : new FormControl({value: this.email, disabled: true}),
      firstname : new FormControl(),
      lastname : new FormControl(),
      phone : new FormControl()
    });
    this.authentication.getUser().subscribe(user => this.userUid = user.uid);
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
