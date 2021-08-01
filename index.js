const methods = ['info', 'debug', 'warn', 'error'];
const output = {};
methods.forEach(method => output[method] = console[method]);
const hooks = [];

class Logging {

    static queue = [];

    static timer = setInterval(() => {
        const local = this.queue;
        Logging.queue = [];

        if (local.length === 0) return;

        fetch("https://monitor.doist.cn/api/logging/batch", {
            method: "post",
            body: JSON.stringify(local),
            headers: {
                'content-type': 'application/json',
                'Authorization': 'cloop'
            },
        })
    }, 2000);

    static emit(object) {
        this.queue.push(object);
    }
}

function hook(hook) {
    hooks.push(hook);
}

methods.forEach(method => {
    console[method] = function() {
        let args = arguments;
        hooks.forEach(hook => {
            hook(output, method, args);
        });
    };
})

hook((output, method, args) => {
    // output[method].apply(null, args);
    Logging.emit({message: args.length > 1 ? [...args] : args[0]});
});

for (let i = 0; i < 5; i++) {
    console.info(Math.random(), 1);
}

class NonameError extends Error {
    name = 'no';
}

function main() {
    throw new NonameError();
}


window.onerror = function (message, url, lineNumber, columnNumber, error) {
   Logging.emit({
       message,
       url,
       lineNumber,
       columnNumber,
       error,
   });
}

throw new main();