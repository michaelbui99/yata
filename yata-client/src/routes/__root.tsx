import {Grid} from "@mantine/core";
import {createRootRoute, Outlet} from "@tanstack/react-router";
import {Navbar} from "../components/Navbar/Navbar.tsx";

export const rootRoute = createRootRoute({
    component: () => (
        <>
            <Grid>
                <Grid.Col span={2}>
                    <Navbar/>
                </Grid.Col>
                <Grid.Col span={10}>
                    <Outlet/>
                </Grid.Col>
            </Grid>
        </>
    ),
})
