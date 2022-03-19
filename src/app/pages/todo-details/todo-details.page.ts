import {Component, OnInit} from '@angular/core';
import {ListService} from "../../services/list.service";
import {ActivatedRoute} from "@angular/router";
import {Todo} from "../../models/todo";
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

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
  public create: string;
  public start: string;
  public estimate : string;
  public end: string;

  constructor(public route: ActivatedRoute,
              public listService : ListService,
              public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.todo = this.listService.getOneTodo(this.listId, this.todoId);
    this.todo.subscribe(todo => {
      this.name = todo.name;
      this.isDone = todo.isDone;
      this.description = todo.description;
      this.create = todo.create;
      this.start = todo.start;
      this.end = todo.end;
      this.estimate = todo.estimate;
    });
    this.ionicForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      isDone: new FormControl(),
      end: new FormControl({value: this.end, disabled: true}),
      estimate: new FormControl({value: this.estimate, disabled: true}),
      start: new FormControl({value: this.start, disabled: true}),
      create: new FormControl({value: this.create, disabled: true})
    });
  }

  ngAfterViewInit(){
    this.ionicForm.valueChanges.subscribe(value => this.updateTodo(value));
  }

  updateTodo(value: any) {
    if(value.name != null) {
      this.listService.updateTodo(value, this.todoId, this.listId);
    }
  }
}
