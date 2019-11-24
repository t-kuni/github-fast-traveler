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

    find(searchType: string, searchWord: string) {
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
                this.urlRepo.save(this.buildUrlInMyRepo(searchWord));
                break;
        }
    }

    private buildUrlInAll(word:string): string {
        return this.buildUrl(word);
    }

    private buildUrlInCurrentUser(word:string) {
        const user = this.pageContext.getRepoOwnerName();
        const query = `user:${user} ${word}`;
        return this.buildUrl(query);
    }

    private buildUrlInCurrentRepo(word:string) {
        const user = this.pageContext.getRepoOwnerName();
        const repo = this.pageContext.getRepoName();
        const query = `repo:${user}/${repo} ${word}`;
        return this.buildUrl(query);
    }

    private buildUrlInMyRepo(word:string) {
        const user = this.pageContext.getLoginName();
        const query = `user:${user} ${word}`;
        return this.buildUrl(query);
    }

    private buildUrl(query: string) {
        return 'https://github.com/search?q=' + query + '&type=Code';
    }
}