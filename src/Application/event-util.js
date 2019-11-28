export function dispatchEvent(type, payload=null) {
    window.postMessage({ type, payload }, "*");
}

export function listenEvent(type, cb) {
    window.addEventListener("message", function(event) {
        if (event.source !== window)
            return;

        if (event.data.type && event.data.type === type) {
            cb(event.data.payload);
        }
    });
}