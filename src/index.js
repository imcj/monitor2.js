import Emitter from './Emitter';
const {windowOnError} = require("./error");
const {hook} = require("./hooks");


/**
 * @typedef {Object} Options
 * @property {boolean} isConsole 控制台输出
 * @property {Object} context
 */

 const getContext = (options) => {
    if (typeof options.context === "function") {
        return options.context();
    }

    if (typeof options.context === 'object') {
        return options.context;
    }

    return {};
};

const injectEmitter = (emitter, options) => {
    /**
     * @param console Console
     * @param method String
     * @param args array
     */
    return (console, method, args) => {
        if (false != options.isConsole) {
            options.isConsole = true;
            console[method].apply(null, args);
        }
        emitter.emit({
            ...getContext(options),
            message: args.length > 1 ? [...args] : args[0],
        });
    }
};

/**
 * 
 * @param {Options} options 
 */
export const config = (options) => {
    const emitter = new Emitter();

    if (window && window.onerror) {
        window.onerror = windowOnError(emitter);
    }

    try {
        hook(injectEmitter(emitter, options));
    } catch(e) {
        console.error(e);
    }
}