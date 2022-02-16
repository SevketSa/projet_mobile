import { Component } from '@angular/core';
import {ListService} from "../services/list.service";
import {List} from "../models/list";
import {CreateTodoComponent} from "../modals/create-todo/create-todo.component";
import {ActivatedRoute} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {CreateListComponent} from "../modals/create-list/create-list.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lists: Observable<List[]>;

  constructor(public route: ActivatedRoute, public listService : ListService, public modalController: ModalController) { }

  ngOnInit() {
    this.lists = this.listService.getAll();
  }

  delete(listId : number) {
    this.listService.delete(listId);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateListComponent
    });

    modal.onDidDismiss().then(() => {});

    return await modal.present();
  }
}
