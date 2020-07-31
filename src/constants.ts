export const baseUrl =
    process.env.NODE_ENV === "production"
        ? "wss://open20api.herokuapp.com"
        : "ws://localhost:8080"
export const bg = "#42BFDF"
