import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ListService} from "../../services/list.service";
import {List} from "../../models/list";
import {ModalController} from "@ionic/angular";
import {AuthenticationService} from "../../services/authentication.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {
  public ionicForm : FormGroup;

  constructor(public formBuilder: FormBuilder,
              public listService : ListService,
              public modalController: ModalController,
              public authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.ionicForm = new FormGroup({
      name: new FormControl(),
      mail_r: new FormControl(),
      mail_rw: new FormControl(),
    });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  public removeLastChar(s : string) : string {
    return (s[s.length-1]==';') ? (s.substring(0, s.length - 1)) : s;
  }

  addList() {
    if(this.ionicForm.value.name != null) {
      this.authenticationService.getUser().pipe(first()).subscribe(
          user => {
            let listMailR : string[] = [];
            let listMailRW : string[] = [];
            if(this.ionicForm.value.mail_r != null) {
              listMailR = this.removeLastChar(this.ionicForm.value.mail_r.replace(/\s/g, "")).split(";");//Suppression des espace et séparation des emails
              listMailR = listMailR.filter(email => email!= user.email);//Suppression de la redondance du mail de l'owner
            }
            if(this.ionicForm.value.mail_rw != null) {
                listMailRW = this.removeLastChar(this.ionicForm.value.mail_rw.replace(/\s/g, "")).split(";");//Suppression des espace et séparation des emails
                listMailRW = listMailRW.filter(email => email!= user.email)//Suppression de la redondance du mail de l'owner
            }
            if(this.ionicForm.value.mail_r != null && this.ionicForm.value.mail_rw != null) {
              listMailR = listMailR.filter(email => listMailRW.forEach(emailRW => email != emailRW))
            }
            this.listService.create(new List(this.ionicForm.value.name, user.uid, null, null, listMailR, listMailRW ));
          }
      )
      this.closeModal().then();
    }
  }
}
