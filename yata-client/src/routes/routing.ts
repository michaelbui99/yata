import {rootRoute} from "./__root.tsx";
import {indexRoute} from "./index.tsx";
import {aboutRoute} from "./about.tsx";
import {createRouter} from "@tanstack/react-router";

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute])
export const router = createRouter({routeTree})


declare module '@tanstack/react-router' {
    interface Register {
        // @ts-expect-error docs
        router: typeof router
    }
}
