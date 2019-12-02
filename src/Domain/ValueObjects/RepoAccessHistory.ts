export default class RepoAccessHistory {
    private version: number;
    private userName: string;
    private repoName: string;

    constructor(version: number, userName: string, repoName: string) {
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
}