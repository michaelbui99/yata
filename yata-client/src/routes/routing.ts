import {rootRoute} from "./__root.tsx";
import {indexRoute} from "./index.tsx";
import {aboutRoute} from "./about.tsx";
import {createRouter} from "@tanstack/react-router";
import {todosRoute} from "./todos.tsx";

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, todosRoute])
export const router = createRouter({routeTree})


declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
