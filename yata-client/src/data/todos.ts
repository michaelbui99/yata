import {Todo} from "../models/todo.ts";
import {get, postJson} from "./http.ts";

export async function getTodos(): Promise<Todo[]> {
    const res = await get<Todo[]>("api/v1/todos");
    if (res.error || !res.data) {
        throw new Error("Failed to retrieve todos: " + res.error);
    }
    return res.data!;
}

export async function postTodo(todo: Pick<Todo, "title" | "description"> & { tags: string[] }): Promise<number> {
    const res = await postJson<number>("api/v1/todos", todo);
    if (res.error || !res.data) {
        throw new Error("Failed to create new TODO" + res.error);
    }
    return res.data;
}
