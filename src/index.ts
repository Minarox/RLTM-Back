import { Elysia } from "elysia";
import drizzle from "./extensions/drizzle.ts";
import logestic from "./extensions/logestic.ts";
import compression from "./extensions/compression.ts";

import { game } from "./controllers/game.ts";

export const app = new Elysia({
    websocket: {
        perMessageDeflate: true,
        idleTimeout: 10
    }
})
    // Extensions
    .decorate('db', drizzle())
    .use(logestic)
    .use(compression)

    // Controllers
    .use(game)

    .get("/", (): string => {
        return 'Hello World';
    })

    // Start the server
    .onStart(({ server, decorator }): void =>  {
        console.clear();
        decorator.logestic.info(`🏎️ RLTM is running at ${server?.url}.`)
    })
    .listen(3000);
