import {inject, injectable} from "tsyringe";
import {IUrlRepository} from "../../Infrastructure/Repositories/interfaces/IUrlRepository";
import {IDomAdapter} from "../../Infrastructure/Adapters/interfaces/IDomAdapter";
import {IPageContextDetector} from "./interfaces/IPageContextDetector";

@injectable()
export class PageContextDetector implements IPageContextDetector {
    private urlRepo: IUrlRepository;
    private domAdapter: IDomAdapter;

    constructor(@inject('IUrlRepository') urlRepo: IUrlRepository,
                @inject('IDomAdapter') domAdapter: IDomAdapter) {
        this.domAdapter = domAdapter;
        this.urlRepo = urlRepo;
    }

    getRepoName() {
        const path = this.urlRepo.getPath();
        const match = path.match(/^\/[^/]+\/(?<repo_name>[^/]+)/);

        if (match === null) {
            return null;
        }

        return match.groups.repo_name;
    }

    hasRepoName() {
        return this.getRepoName() !== null;
    }

    getRepoOwnerName() {
        const path = this.urlRepo.getPath();
        const match = path.match(/^\/(?<user_name>[^/]+)/);

        if (match === null) {
            return null;
        }

        return match.groups.user_name;
    }

    hasRepoOwnerName() {
        return this.getRepoOwnerName() !== null;
    }

    async getLoginName() {
        return this.domAdapter.getLoginUserName();
    }

    async hasLoginName() {
        return this.getLoginName() !== null;
    }

    getSelectingText() {
        return this.domAdapter.getSelectingText();
    }

    isFileFindPage() {
        const path = this.urlRepo.getPath();
        const match = path.match(/^\/[^/]+\/[^/]+\/find\/.+$/);

        return match !== null;
    }
}