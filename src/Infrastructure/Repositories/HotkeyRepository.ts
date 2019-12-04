import Hotkeys from "../../Domain/ValueObjects/Hotkeys";
import {IHotkeyRepository} from "./interfaces/IHotkeyRepository";
import {IStorage} from "./interfaces/IStorage";
import {inject, injectable} from "tsyringe";

@injectable()
export class HotkeyRepository implements IHotkeyRepository {
    private storage: IStorage;

    constructor(@inject('IStorage') storage: IStorage) {
        this.storage = storage;
    }

    key(): string {
        return 'chrome_extension:github_fast_traveler:hotkeys';
    }

    async save(hotkeys: Hotkeys): Promise<null> {
        // FIXME can't access storage from popup
        const key = this.key();
        const value = hotkeys.toJSON();

        return await this.storage.set(key, value);
    }

    async get(): Promise<Hotkeys> {
        const result = await this.storage.get(this.key());

        return Hotkeys.fromJSON(result);
    }

    async has(): Promise<boolean> {
        return (await this.get()) !== null;
    }
}