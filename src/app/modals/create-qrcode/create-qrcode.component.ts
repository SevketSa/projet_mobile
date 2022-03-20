import { Component, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import {ModalController, NavParams} from "@ionic/angular";
import {FormControl, FormGroup} from "@angular/forms";
import {ListService} from "../../services/list.service";

@Component({
  selector: 'app-create-qrcode',
  templateUrl: './create-qrcode.component.html',
  styleUrls: ['./create-qrcode.component.scss'],
})
export class CreateQrcodeComponent implements OnInit {

  public TokenToShare: string = this.navParams.data.myToken;
  public ionicForm: FormGroup;

  constructor(public modalController: ModalController,
              private navParams: NavParams,
              public listService : ListService,) {

  }

  ngOnInit() {
    this.ionicForm = new FormGroup({
      canWrite: new FormControl(),
      canRead: new FormControl({value: "true", disabled: true}),
    });
    this.ionicForm.valueChanges.subscribe(value => this.listService.updateQRToken(this.TokenToShare, value.canWrite))
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
