import {dispatchEvent, listenEventOnce} from '../../Application/event-util';
import {IStorage} from "./interfaces/IStorage";

export class Storage implements IStorage {

    id(): string {
        const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        return Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join('');
    }

    getSetlistenerID(): string {
        console.log('getSetlistenerID', 'chrome_extension:github-fast-traveler:set_storage_result:' + this.id());
        return 'chrome_extension:github-fast-traveler:set_storage_result:' + this.id();
    }

    getGetlistenerID(): string {
        console.log('getGetlistenerID', 'chrome_extension:github-fast-traveler:get_storage_result:' + this.id());
        return 'chrome_extension:github-fast-traveler:get_storage_result:' + this.id();
    }

    set(key: string, value: any): Promise<null> {
        console.log('set', key, value);
        return new Promise((resolve, reject) => {
            const listenerID = this.getSetlistenerID();

            listenEventOnce(listenerID, () => {
                console.log('set-lister-result', listenerID);
                resolve();
            });

            const data = {[key]: value};
            dispatchEvent('chrome_extension:github-fast-traveler:set_storage', {listenerID, data});
        });
    }

    get(key: string): Promise<any> {
        console.log('get', key);
        return new Promise((resolve, reject) => {
            const listenerID = this.getGetlistenerID();

            listenEventOnce(listenerID, (result) => {
                console.log('get-listener-result', listenerID, result);
                if (!(key in result)) {
                    resolve(null);
                    return;
                }

                resolve(result[key]);
            });

            dispatchEvent('chrome_extension:github-fast-traveler:get_storage', {listenerID, key});
        });
    }
}