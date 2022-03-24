import {Component, OnInit} from '@angular/core';
import {CreateListComponent} from '../../modals/create-list/create-list.component';
import {ModalController, Platform} from '@ionic/angular';
import {ListService} from '../../services/list.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-bottom-tabs',
  templateUrl: './bottom-tabs.page.html',
  styleUrls: ['./bottom-tabs.page.scss'],
})
export class BottomTabsPage implements OnInit {
  isWeb: boolean = false;
  public notifications: number;

  constructor(public modalController: ModalController,
              public platform: Platform,
              public listService: ListService,
              public authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.isWeb = this.platform.is('desktop') ? true : false;
    this.authenticationService.getUser().subscribe(user => {
      this.listService.getNotifications(user.uid).subscribe(notifs => this.notifications = notifs.length);
    })
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateListComponent
    });

    modal.onDidDismiss().then(() => {
    });

    return await modal.present();
  }
}
