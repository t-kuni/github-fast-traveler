import {inject, injectable} from "tsyringe";
import {PageContextDetector} from "../Services/PageContextDetector";
import {IGithubApiAdapter} from "../../Infrastructure/Adapters/interfaces/IGithubApiAdapter";
import store from "../store";
import {MUTATION} from "../mutations";

@injectable()
export class AppInitializationInteractor {
    private pageContext: PageContextDetector;
    private store: any;
    private apiAdapter: IGithubApiAdapter;

    constructor(@inject('PageContextDetector') pageContext: PageContextDetector,
                @inject('IGithubApiAdapter') apiAdapter: IGithubApiAdapter) {
        this.apiAdapter = apiAdapter;
        this.pageContext = pageContext;
    }

    async initialize() {
        if (this.pageContext.hasRepoName()) {
            const user = this.pageContext.getRepoOwnerName();
            const repo = this.pageContext.getRepoName();

            const detail = await this.apiAdapter.fetchRepoDetail(user, repo);

            store.commit(MUTATION.SET_CURRENT_REPO_DETAIL, {
                repoDetail  : detail,
            });
        }
    }
}