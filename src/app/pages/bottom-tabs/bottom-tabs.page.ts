import {Component, OnInit} from '@angular/core';
import {CreateListComponent} from '../../modals/create-list/create-list.component';
import {ModalController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-bottom-tabs',
  templateUrl: './bottom-tabs.page.html',
  styleUrls: ['./bottom-tabs.page.scss'],
})
export class BottomTabsPage implements OnInit {
  isWeb: boolean = false;

  constructor(public modalController: ModalController,
              public platform: Platform) { }

  ngOnInit() {
    this.isWeb = this.platform.is('desktop') ? true : false;
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
