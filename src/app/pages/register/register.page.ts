import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {ListService} from '../../services/list.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public ionicForm: FormGroup;

  constructor(public authenticationService: AuthenticationService,
              public formBuilder: FormBuilder,
              public listService: ListService,
              public modalController: ModalController) { }

  ngOnInit() {
    this.ionicForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  register() {
    this.authenticationService.register(this.ionicForm.value);
  }
}
