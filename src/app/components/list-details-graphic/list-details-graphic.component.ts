import {Component, Input, OnInit} from '@angular/core';
import {Todo} from "../../models/todo";
import {CalendarMode, Step} from "ionic2-calendar/calendar";
import * as $ from 'jquery'
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-details-graphic',
  templateUrl: './list-details-graphic.component.html',
  styleUrls: ['./list-details-graphic.component.scss'],
})
export class ListDetailsGraphicComponent implements OnInit {
  @Input() delete: Function;
  @Input() todos: Todo[];
  @Input() listId: number;
  eventSource;
  viewTitle;
  isToday: boolean;
  isMonth = false;
  isWeek = true;
  isDay = false;

  calendar = {
    mode: 'week' as CalendarMode,
    step: 60 as Step,
    currentDate: new Date(),
  };

  constructor(private router: Router) {}

  ngOnInit() {
    let msg: string;
    let events = [];
    for (let todo of this.todos) {
      if (todo.start != "") {
        msg = this.state(todo);
        events.push({
          title: msg+todo.name,
          startTime: new Date(todo.start),
          endTime: new Date(todo.end),
          allDay: false,
          id: todo.id,
        });
      }
    }
    this.eventSource = events;
  }

  updateColor(){
    setTimeout(() => {
      $(".calendar-event-inner:contains('En cours')").addClass("todo-warning");
      $(".calendar-event-inner:contains('Attention')").addClass("todo-attention");
      $(".calendar-event-inner:contains('Fini')").addClass("todo-done");
    }, 50);
  }

  updateColorText(){
      $(".event-detail:contains('En cours')").addClass("todo-details-warning");
      $(".event-detail:contains('Attention')").addClass("todo-details-attention");
      $(".event-detail:contains('Fini')").addClass("todo-details-done");
  }

  ngAfterViewInit(){
    this.updateColor();
  }

  state(todo: Todo) {
    if(!todo.isDone) {
      let delta = (new Date(todo.end).getTime() - new Date(todo.start).getTime())/3;//Interval
      let res = (new Date().getTime() - new Date(todo.start).getTime());
      if(res <= delta*2) {
        return "En cours : ";
      } else if (res > delta *2) {
        return "Attention : ";
      }
    } else if (todo.isDone) {
      return "Fini : ";
    }
  }

  onEventSelected(event) {
    this.updateColorText();
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    this.router.navigate(['/todo-details/'+this.listId+'/'+event.id]).catch(() => console.log("erreur de redirection"))
  }

  changeMode(mode) {
    switch(mode) {
      case 'month' :
        this.isMonth = true;
        this.isWeek = false;
        this.isDay = false;
        this.updateColorText();
        break;
      case 'week' :
        this.isMonth = false;
        this.isWeek = true;
        this.isDay = false;
        this.updateColor();
        break;
      case 'day' :
        this.isMonth = false;
        this.isWeek = false;
        this.isDay = true;
        this.updateColor();
        break;
    }
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onCurrentDateChanged(event:Date) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
    this.updateColor();
  }

  onTimeSelected(event: any) {
    this.updateColorText();
  }
}
