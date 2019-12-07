export default class RepoAccessHistory {
    private userName: string;
    private repoName: string;

    constructor(userName: string, repoName: string) {
        this.userName = userName;
        this.repoName = repoName;
    }

    public toObject(): any {
        return {
            userName: this.userName,
            repoName: this.repoName,
        };
    }

    public static fromObject(obj: any): RepoAccessHistory {
        return new RepoAccessHistory(
            obj.userName,
            obj.repoName,
        )
    }

    public toString() {
        return this.userName + '/' + this.repoName;
    }

    match(history:RepoAccessHistory): boolean {
        return this.userName === history.userName
            && this.repoName === history.repoName;
    }
}