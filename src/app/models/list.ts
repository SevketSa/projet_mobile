import {Todo} from "./todo";

export class List {
  id : number;
  name : String;
  todos : Todo[];

  constructor(name : String, id?: number, todos?: Todo[]) {
    this.id = id ?? Math.floor(Math.random() *100) + Date.now()
    this.name = name;
    this.todos = todos ?? [];
  }
}
