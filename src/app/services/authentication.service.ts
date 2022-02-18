import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

export interface Item {
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    userId: string;

    constructor(public auth: AngularFireAuth) {
        this.auth.user.subscribe(user => {
            if (user !== null && user.uid !== null) {
                this.userId = user.uid
            }
        });
    }

    public getUser() {
        return this.auth.user;
    }

    public getUserId() {
        return this.userId;
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

    public login(formLogin: any) {
        return this.auth.signInWithEmailAndPassword(formLogin.email, formLogin.password);
    }

    public register(formRegister: any) {
        return this.auth.createUserWithEmailAndPassword(formRegister.email, formRegister.password);
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
