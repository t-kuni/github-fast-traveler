import {CONFIG} from './config';

const EVENT_PREFIX = CONFIG.APP_TYPE + ':' + CONFIG.APP_NAME;

const GET_STORAGE = EVENT_PREFIX + ':get_storage';
const SET_STORAGE = EVENT_PREFIX + ':set_storage';
const SET_STORAGE_RESULT = EVENT_PREFIX + ':set_storage_result';
const GET_STORAGE_RESULT = EVENT_PREFIX + ':get_storage_result';

export const EVENT = {
    GET_STORAGE,
    SET_STORAGE,
    SET_STORAGE_RESULT,
    GET_STORAGE_RESULT
};

export function dispatchEvent(type: string, payload: any = null): void {
    window.postMessage({type, payload}, "*");
}

export function listenEvent(type: string, cb: Function, options: any = null): void {
    window.addEventListener("message", function (event) {
        if (event.source !== window)
            return;

        if (event.data.type && event.data.type === type) {
            cb(event.data.payload);
        }
    }, options);
}

export function listenEventOnce(type: string, cb: Function): void {
    listenEvent(type, cb, {
        once: false // FIXME onceは使えない
    });
}