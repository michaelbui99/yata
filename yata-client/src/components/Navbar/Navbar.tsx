import '@mantine/core/styles/Card.css'
import classes from './Navbar.module.css';
import {FC, ReactElement} from "react";
import {Button, Divider, Group, Modal, Text} from '@mantine/core';
import {Card, Center, Title} from "@mantine/core";
import {NavbarItem} from "../NavbarItem/NavbarItem.tsx";
import {useNavigate} from "@tanstack/react-router";
import {IconListCheck, IconPlus, IconTopologyStar} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {CreateTodoModal} from "../CreateTodoModal/CreateTodoModal.tsx";

export type NavbarItemModel = {
    text: string;
    path: string;
    icon?: ReactElement;
}

export const Navbar: FC = () => {
    const navigate = useNavigate();
    const [opened, {open: openCreateTodoModal, close}] = useDisclosure(false);

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
                mr="0"
                shadow="xs"
                py="xl"
            >
                <Card.Section>
                    <Center>
                        <div className={classes.title} onClick={() => navigate({to: "/"})}>
                            <Group>
                                <IconTopologyStar/>
                                <Title order={1}
                                       size="xl"
                                       className={classes.title}
                                       onClick={() => navigate({to: "/"})}>YATA</Title>
                            </Group>
                        </div>
                    </Center>
                </Card.Section>

                <Divider mt="1rem"/>

                <Card.Section mt="0rem">
                    <Button
                        variant="subtle"
                        leftSection={<IconPlus/>}
                        fullWidth={true}
                        onClick={openCreateTodoModal}
                    >
                        <Text>New TODO</Text>
                    </Button>
                </Card.Section>

                <Card.Section mt="0rem">
                    {mainNavItems.map(item => <NavbarItem key={item.path} text={item.text} path={item.path}
                                                          icon={item.icon}/>)}
                </Card.Section>


                <Card.Section>

                </Card.Section>
            </Card>


            <Modal opened={opened} onClose={close} title="Create new TODO">
                <CreateTodoModal closeModal={() => close()}/>
            </Modal>
        </>
    )
}