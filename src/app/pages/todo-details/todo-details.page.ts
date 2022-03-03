import { Component, OnInit } from '@angular/core';
import {ListService} from "../../services/list.service";
import {ActivatedRoute} from "@angular/router";
import {List} from "../../models/list";
import {Todo} from "../../models/todo";
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  public ntp : number = 3;
  public listId : number = +this.route.snapshot.paramMap.get("idL");
  public todoId : number = +this.route.snapshot.paramMap.get("idT");
  public todo: Observable<Todo>;
  public name: String;
  public isDone: boolean;
  public description: String;

  constructor(public route: ActivatedRoute, public listService : ListService) { }

  ngOnInit() {
    this.listService.getOneTodo(this.listId, this.todoId).subscribe(todo => {
      this.name = todo.name;
      this.isDone = todo.isDone;
      this.description = todo.description;
    });
  }
}
