type Version = 1 | 2; // if increment version then add ' | 2 | 3 ...'

export default class Hotkeys {

    private version: Version;
    private findCodeKeys: string;
    private findFileKeys: string;
    private recentlyRepoKeys: string;

    constructor(findCodeKeys: string, findFileKeys: string, recentlyRepoKeys: string) {
        this.version = 2;
        this.findCodeKeys = findCodeKeys;
        this.findFileKeys = findFileKeys;
        this.recentlyRepoKeys = recentlyRepoKeys;
    }

    public toJSON(): string {
        return JSON.stringify({
            version: this.version,
            findCodeKeys: this.findCodeKeys,
            findFileKeys: this.findFileKeys,
            recentlyRepoKeys: this.recentlyRepoKeys,
        });
    }

    public static fromJSON(json: string): Hotkeys {
        const obj = Hotkeys.migrate(JSON.parse(json));
        return new Hotkeys(
            obj.findCodeKeys,
            obj.findFileKeys,
            obj.recentlyRepoKeys
        )
    }

    private static migrate(obj: any): any {
        const version = ('version' in obj) ? obj.version : 1;

        switch (version) {
            case 1:
                obj.version = 2;
                obj.recentlyRepoKeys = 'ctrl+shift+s';
        }

        return obj;
    }
}