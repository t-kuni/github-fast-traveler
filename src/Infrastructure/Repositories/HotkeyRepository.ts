import Hotkeys from "../../Domain/ValueObjects/Hotkeys";
import {IHotkeyRepository} from "./interfaces/IHotkeyRepository";

export class HotkeyRepository implements IHotkeyRepository {
    key(): string {
        return 'chrome_extension:github_fast_traveler:hotkeys';
    }

    save(hotkeys: Hotkeys): void {
        localStorage.setItem(this.key(), hotkeys.toJSON());
    }

    get(): Hotkeys {
        const hotkeyObj = localStorage.getItem(this.key());

        if (hotkeyObj === null) {
            return null;
        }

        return Hotkeys.fromJSON(hotkeyObj);
    }

    has(): boolean {
        return this.get() !== null;
    }
}