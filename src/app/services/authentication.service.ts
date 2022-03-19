import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {filter, map} from "rxjs/operators";
import {AlertController} from '@ionic/angular';

export interface Item {
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(public auth: AngularFireAuth,
                public alertController: AlertController) {
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
            this.presentAlert("Erreur de connexion", "Votre email n'a pas était vérifié. Merci de cliquer sur le lien qui vous a était envoyé par mail au moment de l'inscription.").catch((error) => console.error(error));
        }
    }

    async register(formRegister: any) {
      const userCred = await this.auth.createUserWithEmailAndPassword(formRegister.email, formRegister.password);
      await userCred.user.sendEmailVerification();
      this.auth.signOut().catch(error => console.log("Erreur lors de la deconnexion. "+error));
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

    async presentAlert(alertHeader: string, alertMessage: string) {
        const alert = await this.alertController.create({
            header: alertHeader,
            message: alertMessage,
            buttons: ['OK']
        });

        await alert.present();
    }

}
