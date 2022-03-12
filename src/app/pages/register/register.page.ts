import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('itemConfirmPwd') itemConfirmPwd : ElementRef;
  public ionicForm: FormGroup;
  public barLabel: string = "Password strength:";

  constructor(public authenticationService: AuthenticationService,
              public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.ionicForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      passwordConfirm: new FormControl()
    });
  }

  public static errorMessage(errorCode: string) : string {
    console.log(errorCode);
    switch (errorCode) {
      case "auth/internal-error" :
        return "Erreur interne."
      case "auth/weak-password" :
        return "Mot de passe trop faible."
      case "auth/email-already-in-use" :
        return "Un compte existe déjà avec cette adresse email. <a href='/login'>Se connecter ?</a>"
      default:
        return errorCode;
    }
  }

  public register() {
    if(this.ionicForm.value.password == this.ionicForm.value.passwordConfirm) {
      this.authenticationService.register(this.ionicForm.value).catch(error =>
          this.authenticationService.presentAlert("Erreur d'enregistrement", RegisterPage.errorMessage(error.code)).catch((error) => console.error(error))
      );
    } else {
      this.authenticationService.presentAlert("Erreur d'enregistrement","Les mots de passes sont différents.").catch((error) => console.error(error));
    }
  }
}
