import {Page} from "../../components/Page/Page.tsx";
import {Container, Loader, Table, Text, Title} from "@mantine/core";
import classes from "./TodosPage.module.css"
import {IconCheckbox, IconSquare} from "@tabler/icons-react";
import {useQuery} from "@tanstack/react-query";
import {QUERY_KEY} from "../../data/query-keys.ts";
import {getTodos} from "../../data/todos.ts";

export const TodosPage = () => {
    const {isPending, data: todos, isError} = useQuery({
        queryKey: [QUERY_KEY.TODOS],
        queryFn: getTodos
    })


    if (isPending) {
        return (
            <Page>
                <Container fluid>
                    <Loader/>
                </Container>
            </Page>
        )
    }

    if (isError) {
        return (
            <Page>
                <Text>Failed to retrieve TODOs. Try again later.</Text>
            </Page>
        )
    }

    return (
        <Page>
            <Title ml="0" order={2}>TODOs</Title>
            <Table stickyHeader highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Completed ({todos.filter(t => t.completed).length} / {todos.length})</Table.Th>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Description</Table.Th>
                        <Table.Th>Time Logged</Table.Th>
                        <Table.Th>Created</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {todos.map(todo =>
                        <Table.Tr key={todo.id} className={classes.todoRow}>
                            <Table.Td>
                                {todo.completed ? <IconCheckbox/> : <IconSquare/>}
                            </Table.Td>
                            <Table.Td>
                                {todo.title}
                            </Table.Td>
                            <Table.Td>
                                {todo.description}
                            </Table.Td>
                            <Table.Td>
                                {todo.timeLogged} h
                            </Table.Td>
                            <Table.Td>
                                {todo.creationDate}
                            </Table.Td>
                        </Table.Tr>)
                    }
                </Table.Tbody>
            </Table>
        </Page>
    )
}