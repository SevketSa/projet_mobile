import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ListService} from "../../services/list.service";
import {Router} from '@angular/router';

export interface User { name: string; }

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
              public router: Router) { }

  ngOnInit() {
    this.authenticationService.getUserId().
      subscribe(uid => {
        if(uid != null) {
          this.router.navigate(['/tabs/home']).catch((error) => {
            console.error("Probleme de redirection vers le /tabs/home. Message erreur : "+error.message);
          });
        }
      }
    );
    this.ionicForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  private static errorMessage(errorCode : string) : string {
    switch (errorCode) {
      case "auth/missing-email" :
        return "Merci de renseigner un email.";
      case "auth/invalid-email" :
        return "Merci de renseigner un email valide.";
      case "auth/internal-error" :
        return "Erreur interne."
      case "auth/user-not-found" :
        return "Le compte lié à l'adresse email entrée n'existe pas. <a href='/register'>En creer une ?</a>";
      case "auth/wrong-password" :
        return "Mot de passe ou méthode de connexion incorrect.";
      case "auth/account-exists-with-different-credential" :
        return "Un compte existe déjà avec cet email, essayez de vous connecter d'une autre manière."
      default:
        return errorCode;
    }
  }

  next() {
    this.router.navigate(['/tabs/home']).catch((error) => console.error("Probleme de redirection vers le /tabs/home. Message erreur : "+error.message));
  }

  loginWGoogle() {
    this.authenticationService.loginWGoogle().then(() =>
        this.next()
    ).catch((error) => {
      this.authenticationService.presentAlert("Erreur de connexion", LoginPage.errorMessage(error.code)).catch((error) => console.error(error));
    });
  }

  loginWFacebook() {
    this.authenticationService.loginWFacebook().then(() =>
        this.next()
    ).catch((error) => {
      this.authenticationService.presentAlert("Erreur de connexion", LoginPage.errorMessage(error.code)).catch((error) => console.error(error));
    });
  }

  login() {
    this.authenticationService.login(this.ionicForm.value).then(() =>
        this.next()
    ).catch((error) => {
      this.authenticationService.presentAlert("Erreur de connexion", LoginPage.errorMessage(error.code)).catch((error) => console.error(error));
    });
  }
}
