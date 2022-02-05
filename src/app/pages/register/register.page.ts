import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public ionicForm: FormGroup;

  constructor(public authenticationService: AuthenticationService,
              public formBuilder: FormBuilder
  ) { }

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
