import { Component, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-create-qrcode',
  templateUrl: './create-qrcode.component.html',
  styleUrls: ['./create-qrcode.component.scss'],
})
export class CreateQrcodeComponent implements OnInit {

  public TokenToShare: string = "QRCode ici";
  constructor(public modalController: ModalController,) {

  }

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss();
  }
}
