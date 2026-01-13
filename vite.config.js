import { defineConfig } from "vite";

export default defineConfig({
    base: "/cv-game-edgar-morera/",
    build: {
        minify: "teser",
    },
    server: {
        port: 5173,
        host: '0.0.0.0',
    },
});