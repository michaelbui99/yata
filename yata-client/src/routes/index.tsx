import {createRoute} from "@tanstack/react-router";
import {rootRoute} from "./__root.tsx";

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: function Index() {
        return (
            <div>Hello from index!</div>
        )
    },
})