export function dispatchEvent(type, payload=null) {
    console.log('dispatchEvent', type, payload);
    window.postMessage({ type, payload }, "*");
}

export function listenEvent(type, cb, options = null) {
    console.log('listenEvent', type);
    window.addEventListener("message", function(event) {
        if (event.source !== window)
            return;

        if (event.data.type && event.data.type === type) {
            cb(event.data.payload);
        }
    }, options);
}

export function listenEventOnce(type, cb) {
    listenEvent(type, cb, {
        once: false // FIXME onceは使えない
    });
}