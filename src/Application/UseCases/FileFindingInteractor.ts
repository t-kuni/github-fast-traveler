import {inject, injectable} from "tsyringe";
import {PageContextDetector} from "../Services/PageContextDetector";
import {IUrlRepository} from "../../Infrastructure/Repositories/interfaces/IUrlRepository";

@injectable()
export class FileFindingInteractor {
    private pageContext: PageContextDetector;
    private urlRepo: IUrlRepository;

    constructor(@inject('PageContextDetector') pageContext: PageContextDetector,
                @inject('IUrlRepository') urlRepo: IUrlRepository) {
        this.urlRepo = urlRepo;
        this.pageContext = pageContext;
    }

    async find(searchType: string, searchWord: string): Promise<null> {
        switch (searchType) {
            case 'all':
                this.urlRepo.save(this.buildUrlInAll(searchWord));
                break;
            case 'current-user':
                this.urlRepo.save(this.buildUrlInCurrentUser(searchWord));
                break;
            case 'current-repo':
                this.urlRepo.save(this.buildUrlInCurrentRepo(searchWord));
                break;
            case 'my-repo':
                this.urlRepo.save(await this.buildUrlInMyRepo(searchWord));
                break;
        }
    }

    private buildUrlInAll(word: string): string {
        return this.buildUrl(word);
    }

    private buildUrlInCurrentUser(word: string) {
        const user = this.pageContext.getRepoOwnerName();
        const query = `in:path user:${user} ${word}`;
        return this.buildUrl(query);
    }

    private buildUrlInCurrentRepo(word: string) {
        const user = this.pageContext.getRepoOwnerName();
        const repo = this.pageContext.getRepoName();
        const query = `in:path repo:${user}/${repo} ${word}`;
        return this.buildUrl(query);
    }

    private async buildUrlInMyRepo(word: string): Promise<string> {
        const user = await this.pageContext.getLoginName();
        const query = `in:path user:${user} ${word}`;
        return this.buildUrl(query);
    }

    private buildUrl(query: string) {
        return 'https://github.com/search?q=' + query + '&type=Code';
    }
}