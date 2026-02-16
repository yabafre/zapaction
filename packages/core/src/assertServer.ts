export function assertServer(apiName: string): void {
    if (typeof window !== "undefined") {
        throw new Error(`${apiName} must be called on the server.`);
    }
}
