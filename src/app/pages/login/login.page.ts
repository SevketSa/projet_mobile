import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import {doc, setDoc} from "@angular/fire/firestore";
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
              public auth: AngularFireAuth,
              private afs: AngularFirestore,
              public listService: ListService,
              public router: Router) { }

  ngOnInit() {
    this.ionicForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  checkUser(user: firebase.User) {
    if(user !== null && user.uid !== null){
      const docRef = this.afs.collection('users').doc(user.uid);
      docRef.get().subscribe((d) => {
        if(d.exists) {
          console.log('Il existe');
        } else {
          console.log("Je l'ajoute");
          setDoc(doc(this.afs.firestore, 'users', user.uid), {}).then();
        }
      });
    }
  }

  next() {
      this.auth.authState.subscribe(user => {
          this.checkUser(user);
          this.router.navigate(['/home']).catch((error) => {
              console.error("Probleme de redirection vers le /home");
          });
      })
  }

  loginWGoogle() {
    this.authenticationService.loginWGoogle().then(() =>
        this.next()
    ).catch((error) => {
      console.error("Probleme de connexion avec le compte google ("+error.email+"). Code erreur : "+error.code+". Message erreur : "+error.message);
    });
  }

  loginWFacebook() {
    this.authenticationService.loginWFacebook().then(() =>
        this.next()
    ).catch((error) => {
      console.error("Probleme de connexion avec le compte facebook ("+error.email+"). Code erreur : "+error.code+". Message erreur : "+error.message);
    });
  }

  login() {
    this.authenticationService.login(this.ionicForm.value).then(() =>
        this.next()
    ).catch((error) => {
      console.error("Probleme de connexion. Code erreur : "+error.code+". Message erreur : "+error.message);
    });
  }
}
