import {Group} from "@mantine/core";
import {createRootRoute, Outlet} from "@tanstack/react-router";
import {Navbar} from "../components/Navbar/Navbar.tsx";

export const rootRoute = createRootRoute({
    component: () => (
        <>
            <Group>
                <Navbar/>
                <Outlet/>
            </Group>
        </>
    ),
})
