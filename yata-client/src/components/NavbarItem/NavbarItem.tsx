import {FC, ReactElement} from "react";
import {Button, Text} from "@mantine/core";
import {useNavigate} from "@tanstack/react-router";

export interface NavbarItemProps {
    icon?: ReactElement;
    text: string;
    path: string;
}

export const NavbarItem: FC<NavbarItemProps> = ({text, path, icon}) => {
    const navigate = useNavigate();

    return (
        <Button
            variant="outline"
            color="gray"
            leftSection={icon}
            fullWidth={true}
            onClick={() => navigate({to: path})}
        >
            <Text>{text}</Text>
        </Button>
    )
}