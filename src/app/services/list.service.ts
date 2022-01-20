import { Injectable } from '@angular/core';
import {List} from "../models/list";
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  lists : List[] = [new List("Liste 1", [new Todo("Todo 1")]),
    new List("Liste 2", [new Todo("Todo 1"), new Todo("Todo 2")]),
    new List("Liste 3", [new Todo("Todo 1")])];

  constructor() { }

  public getAll() : List[] {
    return this.lists;
  }

  public getOne(id : number) {
    return this.lists[id];
  }

  public create(list : List) {
    this.lists.push(list);
  }

  public delete(list : List) {
    const i = this.lists.indexOf(list);
    delete this.lists[i];
  }
}
