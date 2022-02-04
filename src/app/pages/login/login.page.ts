import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ListService} from '../../services/list.service';
import {ModalController} from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

  loginWGoogle() {
    this.authenticationService.loginWGoogle();
  }

  loginWFacebook() {
    this.authenticationService.loginWFacebook();
  }

  logout() {
    this.authenticationService.logout();
  }

  login() {
    this.authenticationService.login(this.ionicForm.value);
  }
}
