import {inject, injectable} from "tsyringe";
import {PageContextDetector} from "../Services/PageContextDetector";
import {IUrlRepository} from "../../Infrastructure/Repositories/interfaces/IUrlRepository";

@injectable()
export class CodeFindingInteractor {
    private pageContext: PageContextDetector;
    private urlRepo: IUrlRepository;

    constructor(@inject('PageContextDetector') pageContext: PageContextDetector,
                @inject('IUrlRepository') urlRepo: IUrlRepository) {
        this.urlRepo = urlRepo;
        this.pageContext = pageContext;
    }

    async find(searchType: string, searchWord: string, path: string): Promise<void> {
        switch (searchType) {
            case 'all':
                this.urlRepo.save(this.buildUrlInAll(searchWord, path));
                break;
            case 'current-user':
                this.urlRepo.save(this.buildUrlInCurrentUser(searchWord, path));
                break;
            case 'current-repo':
                this.urlRepo.save(this.buildUrlInCurrentRepo(searchWord, path));
                break;
            case 'my-repo':
                this.urlRepo.save(await this.buildUrlInMyRepo(searchWord, path));
                break;
        }
    }

    private buildUrlInAll(word:string, path:string): string {
        const query = this.buildPath(path) + word;
        return this.buildUrl(query);
    }

    private buildUrlInCurrentUser(word:string, path:string) {
        const user = this.pageContext.getRepoOwnerName();
        const query = this.buildPath(path) + `user:${user} ${word}`;
        return this.buildUrl(query);
    }

    private buildUrlInCurrentRepo(word:string, path:string) {
        const user = this.pageContext.getRepoOwnerName();
        const repo = this.pageContext.getRepoName();
        const query = this.buildPath(path) + `repo:${user}/${repo} ${word}`;
        return this.buildUrl(query);
    }

    private async buildUrlInMyRepo(word:string, path:string): Promise<string> {
        const user = await this.pageContext.getLoginName();
        const query = this.buildPath(path) + `user:${user} ${word}`;
        return this.buildUrl(query);
    }

    private buildPath(path:string)
    {
        if (path == null || path == '') {
            return '';
        }

        return `path:${path} `;
    }

    private buildUrl(query: string) {
        return 'https://github.com/search?q=' + query + '&type=Code';
    }
}
