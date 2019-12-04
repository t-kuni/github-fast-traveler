import {dispatchEvent, listenEventOnce, EVENT} from '../../events';
import {IStorage} from "./interfaces/IStorage";

export class Storage implements IStorage {

    id(): string {
        const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        return Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join('');
    }

    getSetlistenerID(): string {
        return EVENT.GET_STORAGE_RESULT + ':' + this.id();
    }

    getGetlistenerID(): string {
        return EVENT.SET_STORAGE_RESULT + ':' + this.id();
    }

    set(key: string, value: any): Promise<null> {
        return new Promise((resolve, reject) => {
            const listenerID = this.getSetlistenerID();

            listenEventOnce(listenerID, () => {
                resolve();
            });

            const data = {[key]: value};
            dispatchEvent(EVENT.SET_STORAGE, {listenerID, data});
        });
    }

    get(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const listenerID = this.getGetlistenerID();

            listenEventOnce(listenerID, (result) => {
                if (!(key in result)) {
                    resolve(null);
                    return;
                }

                resolve(result[key]);
            });

            dispatchEvent(EVENT.GET_STORAGE, {listenerID, key});
        });
    }
}