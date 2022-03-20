import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {filter, map, switchMap} from "rxjs/operators";
import {AlertController} from '@ionic/angular';
import {doc, setDoc} from '@angular/fire/firestore';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';
import {LoginPage} from '../pages/login/login.page';
import {User} from '../models/user';

export interface Item {
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(public auth: AngularFireAuth,
                public afs: AngularFirestore,
                public alertController: AlertController,
                public router: Router) {
    }

    public getUser() {
      if(this.auth.user != null) {
        return this.auth.user.pipe(filter(user => !!user), map(user => user));
      }
    }

    public getUserFirestore() {
        return this.getUser().pipe(
            switchMap( user => {
                return this.afs.doc<User>('users/'+user.uid).valueChanges();
            })
        )
    }

    public loginWGoogle() {
        this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(userCred => {
            if(userCred.additionalUserInfo.isNewUser){
                setDoc(doc(this.afs.firestore, 'users', userCred.user.uid), {
                    email: userCred.user.email,
                    firstname: userCred.additionalUserInfo.profile['given_name'],
                    lastname: userCred.additionalUserInfo.profile['family_name'],
                    phone: "",
                    profilPicture: userCred.additionalUserInfo.profile['picture']
                })
                .catch(error => console.log("Erreur lors de la création d'un user avec Google ! "+error))
            }
        }).catch((error) => {
            this.presentAlert("Erreur de connexion", LoginPage.errorMessage(error.code)).catch((error) => console.error(error));
        });
    }

    public loginWFacebook() {
        this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(userCred => {
            if(userCred.additionalUserInfo.isNewUser){
                setDoc(doc(this.afs.firestore, 'users', userCred.user.uid), {
                    email: userCred.user.email,
                    firstname: userCred.additionalUserInfo.profile['first_name'],
                    lastname: userCred.additionalUserInfo.profile['last_name'],
                    phone: "",
                    profilPicture: userCred.additionalUserInfo.profile['picture']['data']['url']
                })
                .catch(error => console.log("Erreur lors de la création d'un user avec Google ! "+error))
            }
        }).catch((error) => {
            this.presentAlert("Erreur de connexion", LoginPage.errorMessage(error.code)).catch((error) => console.error(error));
        });
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
        setDoc(doc(this.afs.firestore, 'users', userCred.user.uid), {
            email: userCred.user.email,
            firstname: "",
            lastname: "",
            phone: ""
        })
        .catch(error => console.log("Erreur lors de la création d'un user ! "+error))
        .then(() => {
            this.auth.signOut().catch(error => console.log("Erreur lors de la deconnexion. "+error));
            this.confirmMailAlert("Confirmation mail", "Merci de cliquer sur le lien qui vous a était envoyé par mail afin de valider ce dernier et pouvoir acceder à l'application.").catch((error) => console.error(error));

        });
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

    async confirmMailAlert(alertHeader: string, alertMessage: string) {
        const alert = await this.alertController.create({
            header: alertHeader,
            message: alertMessage,
            buttons: [{
                text: 'OK',
                handler: () => {
                    this.router.navigate(['login']);
                }
            }]
        });

        await alert.present();
    }

    public updateUser(value: any) {
        this.getUser().subscribe(user => {
            if(value.email == user.email) {
                this.afs.firestore.doc('users/' + user.uid).update({
                    firstname: value.firstname ? value.firstname : "",
                    lastname: value.lastname ? value.lastname : "",
                    phone: value.phone ? value.phone : ""
                }).catch( e => console.log(e))
            }
        });
    }
}
