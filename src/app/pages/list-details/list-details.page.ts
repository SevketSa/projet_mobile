import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ListService} from "../../services/list.service";
import {Todo} from "../../models/todo";
import {List} from "../../models/list";
import {ModalController} from "@ionic/angular";
import {CreateTodoComponent} from "../../modals/create-todo/create-todo.component";
import {EMPTY, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  public list: Observable<List>;
  public todos: Todo[] = [];
  public listId?: number;
  public listName?: String;

  constructor(public route: ActivatedRoute, public listService : ListService, public modalController: ModalController) { }

  ngOnInit() {
    this.listService.getOne(+this.route.snapshot.paramMap.get("id")).subscribe(list => {
      this.listId = list.id;
      this.listName = list.name;
      this.todos = list.todos;
    });
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
