import RepoAccessHistory from "./RepoAccessHistory";

type Version = 1; // if increment version then add ' | 2 | 3 ...'

export default class RepoAccessHistoryList {
    private version: Version;
    private _items: Array<RepoAccessHistory>;

    constructor(items: Array<RepoAccessHistory>) {
        this._items = items;
        this.version = 1;
    }

    toJSON(): string {
        return JSON.stringify({
            version: this.version,
            _items: this._items.map(h => h.toObject()),
        });
    }

    public static fromJSON(json: string): RepoAccessHistoryList {
        const obj = JSON.parse(json);
        return new RepoAccessHistoryList(
            obj._items.map(o => RepoAccessHistory.fromObject(o))
        )
    }

    public items(): Array<RepoAccessHistory> {
        return this._items;
    }
}