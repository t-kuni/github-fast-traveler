import RepoAccessHistory from "./RepoAccessHistory";

type Version = 1; // if increment version then add ' | 2 | 3 ...'

const LIMIT = 30;

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

    addHistory(history: RepoAccessHistory): RepoAccessHistoryList {
        const histories = this._items.filter(h => !h.match(history));
        histories.unshift(history);

        return new RepoAccessHistoryList(histories.slice(0, LIMIT));
    }
}