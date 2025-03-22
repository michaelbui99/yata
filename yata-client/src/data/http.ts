import {getServerUrl} from "./config.ts";

export type ApiResponse<T> = {
    error?: string;
    data?: T;
    statusCode: number;
}

export async function get<T>(path: string): Promise<ApiResponse<T>> {
    const url = await getUrl(path);
    const res = await fetch(url);
    return (await res.json()) as ApiResponse<T>;
}

export async function postJson<T>(path: string, payload: any): Promise<ApiResponse<T>> {
    const url = await getUrl(path);
    const res = await fetch(url, {
        body: JSON.stringify(payload),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return (await res.json()) as ApiResponse<T>;
}

async function getUrl(path: string): Promise<string> {
    const serverUrl = await getServerUrl();
    return `${serverUrl}/${path}`;
}