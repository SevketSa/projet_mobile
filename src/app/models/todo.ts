import {formatDate} from '@angular/common';

export class Todo {
  id : number;
  name : string;
  description : string;
  isDone : boolean;
  create: string;
  start: string;
  estimate : string;
  end: string;

  constructor(name : string, estimate : string, description? : string, isDone? : boolean, id?: number) {
    this.id = id ?? Math.floor(Math.random() *100) + Date.now()
    this.name = name;
    this.description = description ?? "";
    this.isDone = isDone ?? false;
    this.create = formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en');
    this.start = "";
    this.estimate = estimate;
    this.end = "";
  }
}
