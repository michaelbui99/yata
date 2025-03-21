import {Tag} from "./tag";

export type Todo = Pick<DetailedTodo, "id" | "title" | "completed">

export type DetailedTodo = {
  id: number;
  title: string;
  description: string;
  tags: Tag[];
  completed: boolean;
  creationDate: Date;
  subTasks: Todo[];
  timeLogged: number;
}
