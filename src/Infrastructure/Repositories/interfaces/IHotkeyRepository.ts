import Hotkeys from "../../../Domain/ValueObjects/Hotkeys";

export interface IHotkeyRepository {
    save(hotkeys: Hotkeys): void;

    get(): Hotkeys;

    has(): boolean;
}