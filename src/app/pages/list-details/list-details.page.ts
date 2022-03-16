import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ListService} from "../../services/list.service";
import {Todo} from "../../models/todo";
import {List} from "../../models/list";
import {ModalController} from "@ionic/angular";
import {CreateTodoComponent} from "../../modals/create-todo/create-todo.component";
import {EMPTY, Observable} from 'rxjs';
import {CreateQrcodeComponent} from "../../modals/create-qrcode/create-qrcode.component";

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
  public listComponent: boolean = true;

  constructor(public route: ActivatedRoute, public listService : ListService, public modalController: ModalController) { }

  ngOnInit() {
    this.listService.getOne(+this.route.snapshot.paramMap.get("id")).subscribe(list => {
      this.listId = list.id;
      this.listName = list.name;
      this.todos = list.todos;
    });
  }

  get myDelete() {
    return this.delete.bind(this);
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

  async shareQRCode(){
    const modal = await this.modalController.create({
      component: CreateQrcodeComponent,
      componentProps:{}
    });
      modal.onDidDismiss().then(()=>{});
      return await modal.present();
  }

  changeComponent() {
    this.listComponent = !this.listComponent;
  }
}
