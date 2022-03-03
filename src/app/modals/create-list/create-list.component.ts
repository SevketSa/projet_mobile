import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ListService} from "../../services/list.service";
import {List} from "../../models/list";
import {ModalController} from "@ionic/angular";
import {AuthenticationService} from "../../services/authentication.service";
import {switchMap} from 'rxjs/operators';

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
      name: new FormControl()
    });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  addList() {
    if(this.ionicForm.value.name != null) {
      this.authenticationService.getUserId().subscribe(
          uid => this.listService.create(new List(this.ionicForm.value.name, uid))
      )
      this.closeModal().then();
    }
  }
}
