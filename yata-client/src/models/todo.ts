import {Tag} from "./tag.ts";

export type DetailedTodo = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    tags: Tag[];
    creationDate: string;
    timeLogged: number;
}

export type Todo = Exclude<DetailedTodo, "tags">