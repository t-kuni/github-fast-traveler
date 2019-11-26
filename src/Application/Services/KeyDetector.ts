import {inject, injectable} from "tsyringe";
import keyMap from "../Utils/keyMap";

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

        if (keyCode === 27) {
            this.keys = [];
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
}