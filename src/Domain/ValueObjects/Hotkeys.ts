type Version = 1 | 2 | 3; // if increment version then add ' | 2 | 3 ...'

export default class Hotkeys {

    private version: Version;
    private fastTravelKeys: string;

    constructor(fastTravelKeys: string) {
        this.version = 3;
        this.fastTravelKeys = fastTravelKeys;
    }

    public toJSON(): string {
        return JSON.stringify({
            version: this.version,
            fastTravelKeys: this.fastTravelKeys,
        });
    }

    public static fromJSON(json: string): Hotkeys {
        const obj = Hotkeys.migrate(JSON.parse(json));
        return new Hotkeys(
            obj.fastTravelKeys
        )
    }

    private static migrate(obj: any): any {
        const version = ('version' in obj) ? obj.version : 1;

        switch (version) {
            case 1:
                obj.version = 2;
                obj.recentlyRepoKeys = 'ctrl+shift+s';
            case 2:
                obj.version = 3;
                obj.fastTravelKeys = obj.findCodeKeys;
        }

        return obj;
    }
}