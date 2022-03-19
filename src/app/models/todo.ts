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
    this.create = formatDate(new Date(), 'yyyy/MM/dd-H', 'en');
    this.start = "";
    this.estimate = estimate;
    this.end = "";
  }
  // let type = estimate.charAt(estimate.length-1)
  // let timeToAdd : number = +estimate.substring(0, estimate.length-1);
  // let date = new Date();
  // switch (type){
  // case 'j' :
  //   this.end = formatDate(date.setDate(date.getDate() + timeToAdd), 'yyyy/MM/dd-H', 'en');
  //   console.log(this.end);
  //   break;
  // case 'h' :
  //   this.end = formatDate(date.setHours(date.getHours() + timeToAdd), 'yyyy/MM/dd-H', 'en');
  //   break;
  // default:
  //   this.end = null;
  //   break;
  // }
}
