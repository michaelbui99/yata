import { Routes } from '@angular/router';
import {TodosComponent} from './todos/todos.component';
import {CalendarComponent} from './calendar/calendar.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "todos",
    pathMatch: "full",
  },
  {
    path: "todos",
    component: TodosComponent
  },
  {
    path: "calendar",
    component: CalendarComponent
  }
];
