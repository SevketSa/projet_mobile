import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ListService} from "../../services/list.service";
import {ModalController, NavParams} from "@ionic/angular";
import {Todo} from "../../models/todo";

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  public ionicForm : FormGroup;
  private listId : number;

  constructor(public formBuilder: FormBuilder, public listService : ListService, public modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.listId = this.navParams.data.listId;
    this.ionicForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      estimate: new FormControl()
    });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  addTodo() {
    if(this.ionicForm.value.name != null && this.ionicForm.value.estimate != null && !this.ionicForm.get('estimate').errors?.pattern) {
      this.listService.createTodo(new Todo(this.ionicForm.value.name, this.ionicForm.value.estimate, this.ionicForm.value.description), this.listId);
      this.closeModal().catch(e => console.log(e));
    }
  }
}
