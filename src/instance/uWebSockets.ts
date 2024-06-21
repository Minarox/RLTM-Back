import {App, TemplatedApp} from "uWebSockets.js";

let instance: TemplatedApp;

/**
 * @description Create singleton instance for uWebSockets
 * @return {TemplatedApp} - uWebSockets
 */
function uWebSockets(): TemplatedApp {
    if (instance) {
        return instance;
    }

    instance = App();
    return instance;
}

export default uWebSockets();
