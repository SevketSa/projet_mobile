import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ListService} from "../../services/list.service";
import {Todo} from "../../models/todo";
import {List} from "../../models/list";
import {ModalController} from "@ionic/angular";
import {CreateTodoComponent} from "../../modals/create-todo/create-todo.component";
import {EMPTY, Observable} from 'rxjs';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  public list: Observable<List>;
  public todos: Observable<Todo[]> = EMPTY;
  public listId?: number;
  public listName?: String;

  constructor(public route: ActivatedRoute, public listService : ListService, public modalController: ModalController) { }

  ngOnInit() {
    this.list = this.listService.getOne(+this.route.snapshot.paramMap.get("id")).valueChanges();
    this.list.subscribe(value => {
      if(value != null) {
        this.listId = value.id;
        this.listName = value.name;
      }
    });
    this.todos = this.listService.getOne(+this.route.snapshot.paramMap.get("id")).collection<Todo>('todos').valueChanges();
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

    modal.onDidDismiss().then(() => {});

    return await modal.present();
  }
}
