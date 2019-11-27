import Hotkeys from "../../Domain/ValueObjects/Hotkeys";
import {IHotkeyRepository} from "./interfaces/IHotkeyRepository";

export class HotkeyRepository implements IHotkeyRepository {
    chrome: any;

    constructor(chrome: any) {
        this.chrome = chrome;
    }

    key(): string {
        return 'chrome_extension:github_fast_traveler:hotkeys';
    }

    save(hotkeys: Hotkeys): Promise<any> {
        const self = this;

        return new Promise((resolve, reject) => {
            console.log('1');
            const key = this.key();
            const value = hotkeys.toJSON();
            console.log('2');

            const data = { [key]: value };
            self.chrome.storage.local.set(data, () => {
                console.log('4');
                resolve();
            });
            console.log('3');
        });
    }

    get(): Promise<Hotkeys> {
        console.log('A');
        const self = this;

        return new Promise((resolve, reject) => {
            console.log('B');
            self.chrome.storage.local.get(this.key(), (result) => {
                console.log('C');

                console.log(result);
                if (!(this.key() in result)) {
                    resolve(null);
                    return;
                }
                console.log('D');

                const hotkeys = Hotkeys.fromJSON(result[this.key()]);
                resolve(hotkeys);
                console.log('E');
            });
        });
    }

    async has(): Promise<boolean> {
        return (await this.get()) !== null;
    }
}