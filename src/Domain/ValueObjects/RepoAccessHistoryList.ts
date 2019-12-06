import RepoAccessHistory from "./RepoAccessHistory";

type Version = 1; // if increment version then add ' | 2 | 3 ...'

export default class RepoAccessHistoryList extends Array<RepoAccessHistory> {
    private version: Version;

    constructor(histories: Array<RepoAccessHistory>) {
        super(...histories);
        this.version = 1;
    }

    public toJSON(): string {
        return JSON.stringify({
            version: this.version,
            histories: this.map(h => h.toObject()),
        });
    }

    public static fromJSON(json: string): RepoAccessHistoryList {
        const obj = JSON.parse(json);
        return new RepoAccessHistoryList(
            obj.histories.map(o => RepoAccessHistory.fromObject(o))
        )
    }
}