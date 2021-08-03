import * as network from "./network";

export default class Emitter {

    constructor() {
        this.queue = [];
        this.request = network.request;

        this.timer = setInterval(() => {
            const local = this.queue;
            this.queue = [];
    
            if (local.length === 0) return;
    
            try {
                this.request("https://monitor.doist.cn/api/logging/batch", {
                    method: "post",
                    body: JSON.stringify(local),
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': 'cloop'
                    },
                })
            } catch (e) {
                console.error(e);
            }
        }, 2000);
    }

    emit(object) {
        this.queue.push(object);
    }
}