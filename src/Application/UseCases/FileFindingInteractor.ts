import {inject, injectable} from "tsyringe";
import {PageContextDetector} from "../Services/PageContextDetector";
import {IUrlRepository} from "../../Infrastructure/Repositories/interfaces/IUrlRepository";
import {STATE} from "../state";
import {ISearchFileNameRepository} from "../../Infrastructure/Repositories/interfaces/ISearchFileNameRepository";

@injectable()
export class FileFindingInteractor {
    private pageContext: PageContextDetector;
    private urlRepo: IUrlRepository;
    private store: any;
    private fileNameRepo: ISearchFileNameRepository;

    constructor(@inject('PageContextDetector') pageContext: PageContextDetector,
                @inject('IUrlRepository') urlRepo: IUrlRepository,
                @inject('ISearchFileNameRepository') fileNameRepo: ISearchFileNameRepository,
                @inject('Store') store: any
    ) {
        this.store = store;
        this.fileNameRepo = fileNameRepo;
        this.urlRepo = urlRepo;
        this.pageContext = pageContext;
    }

    find(searchWord: string) {
        if (!this.pageContext.hasRepoOwnerName() || !this.pageContext.hasRepoName()) {
            return;
        }

        if (searchWord.length > 0) {
            this.fileNameRepo.save(searchWord);
        } else {
            this.fileNameRepo.clear();
        }

        const user = this.pageContext.getRepoOwnerName();
        const repo = this.pageContext.getRepoName();
        const branch = this.store.state[STATE.CURRENT_REPO_DETAIL].default_branch;
        const url = `https://github.com/${user}/${repo}/find/${branch}`;

        this.urlRepo.save(url);
    }
}