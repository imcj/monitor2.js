const consoleMethods = ['info', 'debug', 'warn', 'error'];
const originalConsoleMethods = {};
consoleMethods.forEach(method => originalConsoleMethods[method] = console[method]);
const hooks = [];

// const debug = require("debug");
// const originalDebug = debug;

function executeHook(methods, method, args) {
    hooks.forEach(hook => {
        hook(methods, method, args);
    });
}

// function debugNamespaceProxy() {
//     executeHook({debug}, method, arguments);
//     originalDebug.apply(null, arguments);
// }

// function debugProxy() {
//     return debugNamespaceProxy.apply(null, arguments);
// }

// if (debug) {
//     debug.default = debugProxy
// }

export const hook = function hook(hook) {
    hooks.push(hook);
}

consoleMethods.forEach(method => {
    console[method] = function() {
        try {
            executeHook(originalConsoleMethods, method, arguments);
        } catch (e) {
            originalConsoleMethods["error"](e);
        }
    };
})