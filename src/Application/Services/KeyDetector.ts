import {inject, injectable} from "tsyringe";
import keyMap from "../../Utils/key_map";

@injectable()
export class KeyDetector {

    private keys = [];

    constructor() {
    }

    public onKeyDown(keyCode) {
        if (!(keyCode in keyMap)) {
            return;
        }

        if (this.keys.indexOf(keyCode) >= 0) {
            return;
        }

        this.keys.push(keyCode);
    }

    public onKeyUp(keyCode) {
        // this.keys = this.keys.filter(k => k !== keyCode);
    }

    public getHotkey() {
        const keyInfos = this.keys.map(k => keyMap[k]);

        keyInfos.sort((a, b) => a.priority - b.priority);

        return keyInfos.reduce((acc, info) => {
            return acc + (acc !== '' ? '+' : '') + info.name;
        }, '');
    }

    public clear() {
        this.keys = [];
    }
}