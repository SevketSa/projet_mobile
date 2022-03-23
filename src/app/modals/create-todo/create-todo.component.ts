import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ListService} from "../../services/list.service";
import {ModalController, NavParams} from "@ionic/angular";
import {Todo} from "../../models/todo";
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  public ionicForm : FormGroup;
  private listId : number;

  constructor(public formBuilder: FormBuilder,
              public listService : ListService,
              public modalController: ModalController,
              private navParams: NavParams,
              public authenticationService: AuthenticationService) { }

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
    if(this.ionicForm.value.name != null && this.ionicForm.value.estimate != null && !this.ionicForm.get('estimate').errors?.pattern && this.ionicForm.value.name != "" && this.ionicForm.value.estimate != "") {
      this.listService.createTodo(new Todo(this.ionicForm.value.name, this.ionicForm.value.estimate, this.ionicForm.value.description), this.listId);
      this.closeModal().catch(e => console.log(e));
    } else if(this.ionicForm.value.name == null || this.ionicForm.value.name == "") {
      this.authenticationService.presentAlert("Erreur d'entrée.", "Merci de renseigner un nom pour la tâche que vous souhaitez créer.").catch((e) => console.log(e));
    } else if(this.ionicForm.value.estimate == null || this.ionicForm.value.estimate == "" || this.ionicForm.get('estimate').errors?.pattern) {
      this.authenticationService.presentAlert("Erreur d'entrée.", "Merci de renseigner une estimation du temps de la tâche sous la forme Xh ou Xj (ex: 3h = 3 heures de travail, 2j = 2 jours de travail, etc...).").catch((e) => console.log(e));
    }
  }
}
