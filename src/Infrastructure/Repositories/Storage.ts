import {IStorage} from "./interfaces/IStorage";

export class Storage implements IStorage {

    set(key: string, value: any): Promise<null> {
        return new Promise((resolve, reject) => {
            const data = {[key]: value};
            chrome.storage.local.set(data, () => {
                resolve();
            });
        });
    }

    get(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(key, (result) => {

                if (!(key in result)) {
                    resolve(null);
                    return;
                }

                resolve(result[key]);
            });
        });
    }
}