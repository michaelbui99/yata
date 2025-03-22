import {createRoute} from "@tanstack/react-router";
import {TodosPage} from "../pages/Todos/TodosPage.tsx";
import {rootRoute} from "./__root.tsx";


export const todosRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/todos',
    component: TodosPage
})