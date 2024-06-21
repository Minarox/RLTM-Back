import {App, TemplatedApp} from "uWebSockets.js";

let singleton: TemplatedApp;

/**
 * @description Create singleton instance for uWebSockets (= app)
 * @return {TemplatedApp} - uWebSockets
 */
function app(): TemplatedApp {
    if (singleton) {
        return singleton;
    }

    singleton = App();
    return singleton;
}

export default app();
