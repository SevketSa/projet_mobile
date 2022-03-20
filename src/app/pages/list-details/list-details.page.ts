import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ListService} from "../../services/list.service";
import {Todo} from "../../models/todo";
import {List} from "../../models/list";
import {ModalController} from "@ionic/angular";
import {CreateTodoComponent} from "../../modals/create-todo/create-todo.component";
import {Observable} from 'rxjs';
import {CreateQrcodeComponent} from "../../modals/create-qrcode/create-qrcode.component";
import * as uuid from 'uuid';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  public list: Observable<List>;
  public todos: Todo[] = [];
  public listId?: number;
  public listName?: string;
  public listComponent: boolean = true;

  constructor(public route: ActivatedRoute,
              public listService : ListService,
              public modalController: ModalController,
              public afs: AngularFirestore,
              ) { }

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
    const token = uuid.v4();
    this.listService.createQRToken(token, this.listId);
    const modal = await this.modalController.create({
      component: CreateQrcodeComponent,
      componentProps:{
        "myToken": token
        }
    });
      modal.onDidDismiss().then(()=>{});
      return await modal.present();
  }

  changeComponent() {
    this.listComponent = !this.listComponent;
  }
}
