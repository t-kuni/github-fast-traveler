import {inject, injectable} from "tsyringe";
import {PageContextDetector} from "../Services/PageContextDetector";
import {IUrlRepository} from "../../Infrastructure/Repositories/interfaces/IUrlRepository";
import {STATE} from "../state";
import {ISearchFileNameRepository} from "../../Infrastructure/Repositories/interfaces/ISearchFileNameRepository";
import store from "../store";

@injectable()
export class FileFindingInteractor {
    private pageContext: PageContextDetector;
    private urlRepo: IUrlRepository;
    private fileNameRepo: ISearchFileNameRepository;

    constructor(@inject('PageContextDetector') pageContext: PageContextDetector,
                @inject('IUrlRepository') urlRepo: IUrlRepository,
                @inject('ISearchFileNameRepository') fileNameRepo: ISearchFileNameRepository) {
        this.fileNameRepo = fileNameRepo;
        this.urlRepo = urlRepo;
        this.pageContext = pageContext;
    }

    find() {
        if (!this.pageContext.hasRepoOwnerName() || !this.pageContext.hasRepoName()) {
            return;
        }

        const selectedText = this.pageContext.getSelectingText();
        if (selectedText.length > 0) {
            this.fileNameRepo.save(selectedText);
        } else {
            this.fileNameRepo.clear();
        }

        const user = this.pageContext.getRepoOwnerName();
        const repo = this.pageContext.getRepoName();
        const branch = store.state[STATE.CURRENT_REPO_DETAIL].default_branch;
        const url = `https://github.com/${user}/${repo}/find/${branch}`;

        this.urlRepo.save(url);
    }
}