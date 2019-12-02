import RepoAccessHistory from "../../Domain/ValueObjects/RepoAccessHistory";
import {IRepoAccessHistoryRepository} from "./interfaces/RepoAccessHistoryRepository";

export class RepoAccessHistoryRepository implements IRepoAccessHistoryRepository {
    chrome: any;

    constructor(chrome: any) {
        this.chrome = chrome;
    }

    key(): string {
        return 'chrome_extension:github_fast_traveler:repo_access_history';
    }

    save(history: Array<RepoAccessHistory>): Promise<any> {
        const self = this;

        return new Promise((resolve, reject) => {
            const key = this.key();
            const value = history.map((h: RepoAccessHistory) => h.toJSON());

            const data = {[key]: value};
            self.chrome.storage.local.set(data, () => {
                resolve();
            });
        });
    }

    get(): Promise<Array<RepoAccessHistory>> {
        const self = this;

        return new Promise((resolve, reject) => {
            self.chrome.storage.local.get(this.key(), (result) => {

                if (!(this.key() in result)) {
                    resolve(null);
                    return;
                }

                const histories = result[this.key()].map((r) => RepoAccessHistory.fromJSON(r));
                resolve(histories);
            });
        });
    }

    async has(): Promise<boolean> {
        return (await this.get()) !== null;
    }
}