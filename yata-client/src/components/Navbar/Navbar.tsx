import '@mantine/core/styles/Card.css'
import classes from './Navbar.module.css';
import {FC, ReactElement} from "react";
import { Divider } from '@mantine/core';
import {Card, Center, Title} from "@mantine/core";
import {NavbarItem} from "../NavbarItem/NavbarItem.tsx";
import {useNavigate} from "@tanstack/react-router";
import {IconListCheck} from "@tabler/icons-react";

export type NavbarItemModel = {
    text: string;
    path: string;
    icon?: ReactElement;
}

export const Navbar: FC = () => {
    const navigate = useNavigate();

    const mainNavItems: NavbarItemModel[] = [
        {
            text: "TODOs",
            path: "/todos",
            icon: <IconListCheck/>
        }
    ]

    return (
        <>
            <Card
                component="nav"
                h="100vh"
                w="250px"
                shadow="xs"
                py="xl"
            >
                <Card.Section>
                    <Center>
                        <Title order={1}
                               className={classes.title}
                               onClick={() => navigate({to: "/"})}>YATA</Title>
                    </Center>
                </Card.Section>

                <Divider mt="1rem"/>

                <Card.Section mt="2rem">
                    {mainNavItems.map(item => <NavbarItem text={item.text} path={item.path} icon={item.icon}/>)}
                </Card.Section>


                <Card.Section>

                </Card.Section>
            </Card>
        </>
    )
}