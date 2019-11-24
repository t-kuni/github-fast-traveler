// @ts-ignore
import GitHub from 'github-api';
import {IGithubApiAdapter} from "./interfaces/IGithubApiAdapter";

export class GithubApiAdapter implements IGithubApiAdapter {

    fetchRepoDetail(user: string, repo: string): Promise<any> {
        return new Promise((resolve, reject) => {
            (new GitHub())
                .getRepo(user, repo)
                .getDetails(function (err: any, detail: any) {
                    resolve(detail);
                });
        });
    }
}