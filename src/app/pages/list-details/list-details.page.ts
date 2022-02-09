import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ListService} from "../../services/list.service";
import {Todo} from "../../models/todo";
import {List} from "../../models/list";
import {ModalController} from "@ionic/angular";
import {CreateTodoComponent} from "../../modals/create-todo/create-todo.component";

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  public list : List;
  dataReturned: any;

  constructor(public route: ActivatedRoute, public listService : ListService, public modalController: ModalController) { }

  ngOnInit() {
    this.list = this.listService.getOne(+this.route.snapshot.paramMap.get("id"));
  }

  delete(todoId : number) {
    this.listService.deleteTodo(this.list.id, todoId);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        "listId": this.list.id
      }
    });

    modal.onDidDismiss().then(() => {});

    return await modal.present();
  }
}
