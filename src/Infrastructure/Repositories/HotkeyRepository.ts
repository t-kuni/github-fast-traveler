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
            const key = this.key();
            const value = hotkeys.toJSON();

            const data = { [key]: value };
            self.chrome.storage.local.set(data, () => {
                resolve();
            });
        });
    }

    get(): Promise<Hotkeys> {
        const self = this;

        return new Promise((resolve, reject) => {
            self.chrome.storage.local.get([this.key()], (hotkeyObj) => {

                if (hotkeyObj === null) {
                    resolve(null);
                    return;
                }

                const hotkeys = Hotkeys.fromJSON(hotkeyObj);
                resolve(hotkeys);
            });
        });
    }

    has(): boolean {
        return this.get() !== null;
    }
}