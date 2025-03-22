import {FC, ReactElement} from "react";
import {Box} from "@mantine/core";

export interface PageProps {
    children: ReactElement[] | ReactElement
}

export const Page: FC<PageProps> = ({children}) => {
    if (Array.isArray(children)) {
        return (
            <Box m="0" py="md" w="100%" h="100vh">
                {...children}
            </Box>
        )
    } else {
        return (
            <Box m="0" py="md" w="100%" h="100vh">
                {children}
            </Box>
        )
    }
}