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
  public listId : number = +this.route.snapshot.paramMap.get("id");
  dataReturned: any;

  constructor(public route: ActivatedRoute, public listService : ListService, public modalController: ModalController) { }

  ngOnInit() {
    this.list = this.listService.getOne(this.listId);
  }

  delete(todoId : number) {
    this.listService.deleteTodo(this.listId, todoId);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        "listId": this.listId
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        if(this.dataReturned.name != null) {
          this.listService.createTodo(new Todo(this.dataReturned.name, this.dataReturned.description), this.listId)
        }
      }
    });

    return await modal.present();
  }
}
