import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertController, NavParams} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
  providers: [NavParams]
})
export class PasswordRecoveryPage implements OnInit {

  public ionicForm: FormGroup;
  public code: string;

  constructor(public authenticationService: AuthenticationService,
              public formBuilder: FormBuilder,
              private navParams: NavParams,
              public alertController: AlertController,
              public router: Router) { }

  ngOnInit() {
    this.code = this.navParams.data.code;
    this.ionicForm = new FormGroup({
      email: new FormControl()
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Password reset link sent',
      message: 'If an account exists with this email, a link to reset your password has been emailed to you.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['login']);
        }
      }]
    });

    await alert.present();
  }

  sendRequestResetPwd() {
    this.presentAlert().then(() => this.authenticationService.requestResetPassword(this.ionicForm.value));
  }
}
