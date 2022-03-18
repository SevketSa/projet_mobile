import { Component, OnInit } from '@angular/core';
import {CreateListComponent} from '../../modals/create-list/create-list.component';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-bottom-tabs',
  templateUrl: './bottom-tabs.page.html',
  styleUrls: ['./bottom-tabs.page.scss'],
})
export class BottomTabsPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
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
