import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {filter, map} from "rxjs/operators";

export interface Item {
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(public auth: AngularFireAuth) {
    }

    public getUser() {
        return this.auth.user;
    }

    public getUserId() {
      if(this.auth.user != null) {
        return this.auth.user.pipe(filter(user => !!user), map(user => user));
      }
    }

    public loginWGoogle() {
        return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    public loginWFacebook() {
        return this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }

    public logout() {
        return this.auth.signOut();
    }

    async login(formLogin: any) {
        const userCred = await this.auth.signInWithEmailAndPassword(formLogin.email, formLogin.password);
        if (!userCred.user.emailVerified) {
          await this.auth.signOut();
          console.log("Email non vérifié")
        }
    }

    async register(formRegister: any) {
      const userCred = await this.auth.createUserWithEmailAndPassword(formRegister.email, formRegister.password);
      await userCred.user.sendEmailVerification();
      this.auth.signOut();
    }

    public requestResetPassword(form: any) {
        return this.auth.sendPasswordResetEmail(form.email);
    }

    public verifyResetPassword(code: string) {
        return this.auth.verifyPasswordResetCode(code);
    }

    public confirmResetPassword(code: string, newPassword: string) {
        return this.auth.confirmPasswordReset(code, newPassword);
    }

}
