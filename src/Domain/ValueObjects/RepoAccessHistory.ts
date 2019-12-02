type Version = 1; // if increment version then add ' | 2 | 3 ...'

export default class RepoAccessHistory {

    private version: Version;
    private userName: string;
    private repoName: string;

    constructor(version: Version, userName: string, repoName: string) {
        this.version = version;
        this.userName = userName;
        this.repoName = repoName;
    }

    public toJSON(): string {
        return JSON.stringify({
            version: this.version,
            userName: this.userName,
            repoName: this.repoName,
        });
    }

    public static fromJSON(json: string): RepoAccessHistory {
        const obj = JSON.parse(json);
        return new RepoAccessHistory(
            obj.version,
            obj.userName,
            obj.repoName,
        )
    }

    public toString() {
        return this.userName + '/' + this.repoName;
    }
}