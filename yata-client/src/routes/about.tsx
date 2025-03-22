import {createRoute} from "@tanstack/react-router";
import {rootRoute} from "./__root.tsx";

export const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: function About() {
        return <div className="p-2">Hello from About!</div>
    },
})