import {Component, OnInit} from '@angular/core';
import {ListService} from "../../services/list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Todo} from "../../models/todo";
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {formatDate} from '@angular/common';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  private listId = +this.route.snapshot.paramMap.get("idL");
  private todoId = +this.route.snapshot.paramMap.get("idT");
  private todo: Observable<Todo>;
  public ionicForm: FormGroup;
  public name : string;
  public description : string;
  public isDone : boolean;
  public create: string = "";
  public start: string = "";
  public estimate : string;
  public end: string = "";
  public canWrite: boolean = false;

  constructor(public route: ActivatedRoute,
              public listService : ListService,
              public formBuilder: FormBuilder,
              public router: Router,
              public authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.ionicForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      isDone: new FormControl(),
      end: new FormControl({value: "", disabled: true}),
      estimate: new FormControl({value: this.estimate, disabled: true}),
      start: new FormControl({value: "", disabled: true}),
      create: new FormControl({value: "", disabled: true})
    });
    this.todo = this.listService.getOneTodo(this.listId, this.todoId);
    this.todo.subscribe(todo => {
      this.name = todo.name;
      this.isDone = todo.isDone;
      this.description = todo.description;
      this.create = todo.create
      this.start = todo.start;
      this.end = todo.end;
      this.estimate = todo.estimate;
      this.ionicForm.controls['create'].setValue(todo.create == "" ? "" : formatDate(new Date(todo.create), 'EEEE dd MMMM YYYY - HH:mm:ss', 'fr'));
      this.ionicForm.controls['start'].setValue(todo.start == "" ? "" : formatDate(new Date(todo.start), 'EEEE dd MMMM YYYY - HH:mm:ss', 'fr'));
      this.ionicForm.controls['end'].setValue(todo.end == "" ? "" : formatDate(new Date(todo.end), 'EEEE dd MMMM YYYY - HH:mm:ss', 'fr'));
    });
    this.authenticationService.getUser().subscribe(user => {
      this.listService.canWrite(this.listId, user.email).subscribe(canWrite => {
        this.canWrite = canWrite;
        if(!canWrite) {
          this.ionicForm.controls['name'].disable();
          this.ionicForm.controls['description'].disable();
          this.ionicForm.controls['isDone'].disable();
        }
      });
    })
  }

  submitForm() {
    if(this.ionicForm.value.name != null) {
      if(this.ionicForm.value.isDone && this.ionicForm.getRawValue().start == ""){ //Valide la fin de la tache sans l'avoir commencé
        this.startTodo();
      } else {
        this.ionicForm.controls['start'].setValue(this.start);
        this.ionicForm.controls['end'].setValue(this.end);
        this.updateTodo();
      }
    }
  }

  updateTodo() {
    this.listService.updateTodo(this.ionicForm.getRawValue(), this.todoId, this.listId);
    this.router.navigate(['/list-details/'+this.listId]).then(() =>
        this.authenticationService.presentAlert("Sauvegarde de la tâche","Les modifications apportées à la tâche ont bien été appliqués.").catch((e) => console.log(e))
    );
  }

  startTodo(){
    let type = this.estimate.charAt(this.estimate.length-1)
    let timeToAdd : number = +this.estimate.substring(0, this.estimate.length-1);
    let date = new Date();
    let newDate : string;
    this.ionicForm.controls['start'].setValue(formatDate(date, 'yyyy-MM-ddTHH:mm:ss', 'en'));
    switch (type) {
      case 'j' :
        newDate = formatDate(date.setDate(date.getDate() + timeToAdd), 'yyyy-MM-ddTHH:mm:ss', 'en');
        break;
      case 'h' :
        newDate = formatDate(date.setHours(date.getHours() + timeToAdd), 'yyyy-MM-ddTHH:mm:ss', 'en');
        break;
    }
    this.ionicForm.controls['end'].setValue(newDate);
    this.updateTodo();
  }
}
