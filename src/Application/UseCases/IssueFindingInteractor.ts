import {inject, injectable} from "tsyringe";
import {PageContextDetector} from "../Services/PageContextDetector";
import {IUrlRepository} from "../../Infrastructure/Repositories/interfaces/IUrlRepository";

@injectable()
export class IssueFindingInteractor {
    private pageContext: PageContextDetector;
    private urlRepo: IUrlRepository;

    constructor(@inject('PageContextDetector') pageContext: PageContextDetector,
                @inject('IUrlRepository') urlRepo: IUrlRepository) {
        this.urlRepo = urlRepo;
        this.pageContext = pageContext;
    }

    async find(searchType: string, searchWord: string, searchState: string): Promise<null> {
        switch (searchType) {
            case 'all':
                this.urlRepo.save(this.buildUrlInAll(searchWord, searchState));
                break;
            case 'current-user':
                this.urlRepo.save(this.buildUrlInCurrentUser(searchWord, searchState));
                break;
            case 'current-repo':
                this.urlRepo.save(this.buildUrlInCurrentRepo(searchWord, searchState));
                break;
            case 'my-repo':
                this.urlRepo.save(await this.buildUrlInMyRepo(searchWord, searchState));
                break;
        }
    }

    private buildUrlInAll(word: string, state: string): string {
        const stateQuery = this.makeStateQuery(state);
        return `https://github.com/search?q=is:issue ${word} ${stateQuery}`;
    }

    private buildUrlInCurrentUser(word: string, state: string): string {
        const user = this.pageContext.getRepoOwnerName();
        const stateQuery = this.makeStateQuery(state);
        return `https://github.com/search?q=is:issue user:${user} ${word} ${stateQuery}`;
    }

    private buildUrlInCurrentRepo(word: string, state: string): string {
        const user = this.pageContext.getRepoOwnerName();
        const repo = this.pageContext.getRepoName();
        const stateQuery = this.makeStateQuery(state);
        return `https://github.com/${user}/${repo}/issues?q=${word} ${stateQuery}`;
    }

    private async buildUrlInMyRepo(word: string, state: string): Promise<string> {
        const user = await this.pageContext.getLoginName();
        const stateQuery = this.makeStateQuery(state);
        return `https://github.com/search?q=is:issue user:${user} ${word} ${stateQuery}`;
    }

    private makeStateQuery(state: string): string {
        if (state === 'all') {
            return '';
        }

        return `state:${state}`;
    }
}
