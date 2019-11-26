export default class Hotkeys {
    private findCodeKeys: string;
    private findFileKeys: string;

    constructor(findCodeKeys: string, findFileKeys: string) {
        this.findCodeKeys = findCodeKeys;
        this.findFileKeys = findFileKeys;
    }

    public toJSON(): string {
        return JSON.stringify({
            findCodeKeys: this.findCodeKeys,
            findFileKeys: this.findFileKeys,
        });
    }

    public static fromJSON(json: string): Hotkeys {
        const obj = JSON.parse(json);
        return new Hotkeys(
            obj.findCodeKeys,
            obj.findFileKeys,
        )
    }
}