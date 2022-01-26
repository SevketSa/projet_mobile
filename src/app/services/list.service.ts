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

  private indexList(list : List) : number {
    return this.lists.indexOf(list, 0);
  }

  private indexTodo(list : List, i : number, todo : Todo) : number {
    return list[i].indexOf(todo, 0);
  }

  public delete(list : List) {
    const index = this.indexList(list);
    if (index > -1) {
      this.lists.splice(index, 1);
    }
  }

  public deleteTodo(list : List, todo : Todo) {
    const i = this.indexList(list);
    const index = this.indexTodo(list, i, todo);
    if (index > -1) {
      this.lists[i].todos.splice(index, 1);
    }
  }
}
