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

    async find(searchType: string, searchWord: string, extension: string): Promise<null> {
        switch (searchType) {
            case 'all':
                this.urlRepo.save(this.buildUrlInAll(searchWord, extension));
                break;
            case 'current-user':
                this.urlRepo.save(this.buildUrlInCurrentUser(searchWord, extension));
                break;
            case 'current-repo':
                this.urlRepo.save(this.buildUrlInCurrentRepo(searchWord, extension));
                break;
            case 'my-repo':
                this.urlRepo.save(await this.buildUrlInMyRepo(searchWord, extension));
                break;
        }
    }

    private buildUrlInAll(word:string, ext:string): string {
        const query = this.buildExt(ext) + word;
        return this.buildUrl(query);
    }

    private buildUrlInCurrentUser(word:string, ext:string) {
        const user = this.pageContext.getRepoOwnerName();
        const query = this.buildExt(ext) + `user:${user} ${word}`;
        return this.buildUrl(query);
    }

    private buildUrlInCurrentRepo(word:string, ext:string) {
        const user = this.pageContext.getRepoOwnerName();
        const repo = this.pageContext.getRepoName();
        const query = this.buildExt(ext) + `repo:${user}/${repo} ${word}`;
        return this.buildUrl(query);
    }

    private async buildUrlInMyRepo(word:string, ext:string): Promise<string> {
        const user = await this.pageContext.getLoginName();
        const query = this.buildExt(ext) + `user:${user} ${word}`;
        return this.buildUrl(query);
    }

    private buildExt(extension:string)
    {
        if (extension == null || extension == '') {
            return '';
        }

        return `extension:${extension} `;
    }

    private buildUrl(query: string) {
        return 'https://github.com/search?q=' + query + '&type=Code';
    }
}