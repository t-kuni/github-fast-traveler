const GitHub = require('github-api');
import {IGithubApiAdapter} from "./interfaces/IGithubApiAdapter";

export class GithubApiAdapter implements IGithubApiAdapter {
    fetchRepoDetail(user: string, repo: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const github = new GitHub();
            const repoObj = github.getRepo(user, repo);
            repoObj.getDetails((err: any, detail: any) => {
                resolve(detail);
            });
        });
    }
}