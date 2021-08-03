import Emitter from "./Emitter";

/**
 * 
 * @param {Emitter} emitter 
 * @returns 
 */
export const windowOnError = (emitter) => {
    return function (message, url, lineNumber, columnNumber, error) {
        emitter.emit({
            message,
            url,
            lineNumber,
            columnNumber,
            error,
        });
    };
}