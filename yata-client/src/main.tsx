import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "@tanstack/react-router";
import {router} from "./routes/routing.ts";
import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from "@mantine/core";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const theme = createTheme({
    fontFamily: 'Verdana, sans-serif',
    fontFamilyMonospace: 'Monaco, Courier, monospace',
    headings: {fontFamily: 'Greycliff CF, sans-serif'},
});

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <MantineProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router}/>
                </QueryClientProvider>
            </MantineProvider>
        </StrictMode>,
    )
}