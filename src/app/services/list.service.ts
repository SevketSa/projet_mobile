import { Injectable } from '@angular/core';
import {List} from "../models/list";
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  lists : List[] = [];

  constructor() { }

  public init() {
    this.lists.push(new List("List 1", [new Todo("Todo 1")]));
    this.lists.push(new List("List 2", [new Todo("Todo 1"), new Todo("Todo 2")]));
    this.lists.push(new List("List 3", [new Todo("Todo 1")]));
  }

  public getAll() : List[] {
    return this.lists;
  }

  public getOne(id : number) {
    return this.lists[id];
  }

  public create(list : List) {
    this.lists.push(list);
  }

  public createTodo(todo : Todo, listId : number) {
    this.lists[listId].todos.push(todo);
  }

  public delete(listId : number) {
    this.lists.splice(listId, 1);
  }

  public deleteTodo(listId : number, todoId : number) {
    this.lists[listId].todos.splice(todoId, 1);
  }
}
