export type ClientConfig = {
    api: {
        protocol: "http" | "https";
        host: string;
        port?: number
    }
}

export async function getClientConfig(): Promise<ClientConfig> {
    const res = await fetch("./config.json");
    if (!res.ok) {
        throw new Error("Failed to fetch client config");
    }
    return (await res.json()) as ClientConfig;
}

export async function getServerUrl(): Promise<string> {
    const config = await getClientConfig();
    let url = `${config.api.protocol}://${config.api.host}`;
    if (config.api.port != undefined) {
        url += `:${config.api.port}`
    }
    return url;
}