import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListService} from "../../services/list.service";
import {ModalController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  public ionicForm : FormGroup;
  public listId : number;

  constructor(public formBuilder: FormBuilder, public listService : ListService, public modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.listId = this.navParams.data.listId;
    this.ionicForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl()
    });
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  addTodo() {
    if(this.ionicForm.value.name != "") {
      this.modalController.dismiss(this.ionicForm.value);
    }
  }
}
