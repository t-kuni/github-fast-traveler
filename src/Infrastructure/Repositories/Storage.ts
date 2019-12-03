import {dispatchEvent} from '../../Application/event-util';
import {IStorage} from "./interfaces/Storage";

export class Storage implements IStorage {

    set(key: string, value: any): Promise<null> {
        return new Promise((resolve, reject) => {
            const data = {[key]: value};
            dispatchEvent('storage_set', {
                data,
                cb: () => {
                    resolve();
                }
            });
        });
    }

    get(key: string): Promise<any> {
        return new Promise((resolveOuter, rejectOuter) => {

            (new Promise((resolveInner, rejectInner) => {
                dispatchEvent('storage_get', JSON.stringify({
                    key,
                    cb: (result) => resolveInner.bind(this, result)
                }));
            }).then((result: any) => {

                if (!(key in result)) {
                    resolveOuter(null);
                    return;
                }

                resolveOuter(result[key]);
            }));
        });
    }
}