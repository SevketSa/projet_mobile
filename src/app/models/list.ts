import {Todo} from "./todo";

export class List {
  id : number;
  name : string;
  todos : Todo[];
  canRead : string[];
  canWrite : string[];
  owner : string;

  constructor(name : string, uid : string, id?: number, todos?: Todo[], canRead?: string[], canWrite?: string[]) {
    this.id = id ?? Math.floor(Math.random() *100) + Date.now()
    this.name = name;
    this.todos = todos ?? [];
    this.canRead = canRead ?? [];
    this.canWrite = canWrite ?? [];
    this.owner = uid;
  }
}
