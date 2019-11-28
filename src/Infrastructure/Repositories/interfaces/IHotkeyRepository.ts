import Hotkeys from "../../../Domain/ValueObjects/Hotkeys";

export interface IHotkeyRepository {
    save(hotkeys: Hotkeys): Promise<any>;

    get(): Promise<Hotkeys>;

    has(): Promise<boolean>;
}