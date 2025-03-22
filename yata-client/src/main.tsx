import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "@tanstack/react-router";
import {router} from "./routes/routing.ts";
import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from "@mantine/core";

const theme = createTheme({
    fontFamily: 'Verdana, sans-serif',
    fontFamilyMonospace: 'Monaco, Courier, monospace',
    headings: { fontFamily: 'Greycliff CF, sans-serif' },
});

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <MantineProvider theme={theme}>
                <RouterProvider router={router} />
            </MantineProvider>
        </StrictMode>,
    )
}