import {Component, Input, OnInit} from '@angular/core';
import {Todo} from "../../models/todo";
import {CalendarMode, Step} from "ionic2-calendar/calendar";

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

  constructor() {}

  ngOnInit() {
    let events = [];
    for (let todo of this.todos) {
      if (todo.start != "") {
        events.push({
          title: todo.name,
          startTime: new Date(todo.start),
          endTime: new Date(todo.end),
          allDay: false
        });
      }
    }
    this.eventSource = events;
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  changeMode(mode) {
    switch(mode) {
      case 'month' :
        this.isMonth = true;
        this.isWeek = false;
        this.isDay = false;
        break;
      case 'week' :
        this.isMonth = false;
        this.isWeek = true;
        this.isDay = false;
        break;
      case 'day' :
        this.isMonth = false;
        this.isWeek = false;
        this.isDay = true;
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
  }
}
