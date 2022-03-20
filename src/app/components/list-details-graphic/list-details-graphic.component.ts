import {Component, Input, OnInit} from '@angular/core';
import {Todo} from "../../models/todo";
import {localeFr, MbscCalendarEvent, MbscEventcalendarView, setOptions} from '@mobiscroll/angular';

setOptions({
  locale: localeFr,
  theme: 'ios',
  themeVariant: 'light'
});

@Component({
  selector: 'app-list-details-graphic',
  templateUrl: './list-details-graphic.component.html',
  styleUrls: ['./list-details-graphic.component.scss'],
})
export class ListDetailsGraphicComponent implements OnInit {
  @Input() delete: Function;
  @Input() todos: Todo[];
  @Input() listId: number;
  private id: number = 0;
  myEvents: MbscCalendarEvent[] = [];

  constructor() { }

  ngOnInit() {
    for (let todo of this.todos) {
      if(todo.start != "") {
        this.myEvents.push({
          start: todo.start,
          end: todo.end,
          title: todo.isDone ? 'Done' : 'Work in progress',
          resource: this.id
        });
        this.myResources.push({
          id: this.id++,
          name: todo.name + ".\nState : " + (todo.isDone ? 'Done.' : 'Work in progress.'),
          color: this.whichColor(todo)
        });
      }
    }
  }

  whichColor(todo : Todo) {
    if(!todo.isDone && todo.start != "") {
      let delta = (new Date(todo.end).getTime() - new Date(todo.start).getTime())/3;//Interval
      let res = (new Date().getTime() - new Date(todo.start).getTime());
      if(res <= delta*2) {
        return "#ffc409";
      } else if (res > delta *2) {
        return "#eb445a";
      }
    } else if (todo.isDone) {
      return "#2dd36f";
    }
  }

  view: MbscEventcalendarView = {
    timeline: {
      rowHeight: 'equal',
      type: 'week',
      timeCellStep: 1440,
      timeLabelStep: 1440,
      weekNumbers: true,
      size: 2
    }
  };

  myResources = [];
}
