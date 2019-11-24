export interface IGithubApiAdapter {
    fetchRepoDetail(user:string, repo:string): Promise<any>;
}