import RepoAccessHistory from "../../Domain/ValueObjects/RepoAccessHistory";
import {IRepoAccessHistoryRepository} from "./interfaces/IRepoAccessHistoryRepository";
import {inject, injectable} from "tsyringe";
import {IStorage} from "./interfaces/IStorage";
import RepoAccessHistoryList from "../../Domain/ValueObjects/RepoAccessHistoryList";

@injectable()
export class RepoAccessHistoryRepository implements IRepoAccessHistoryRepository {
    private storage: IStorage;

    constructor(@inject('IStorage') storage: IStorage) {
        this.storage = storage;
    }

    key(): string {
        return 'chrome_extension:github_fast_traveler:repo_access_history';
    }

    save(histories: RepoAccessHistoryList): void {
        const key = this.key();
        const value = histories.toJSON();

        this.storage.set(key, value);
    }

    async get(): Promise<RepoAccessHistoryList> {
        const result = await this.storage.get(this.key());

        if (result === null) {
            return new RepoAccessHistoryList([]);
        }

        return RepoAccessHistoryList.fromJSON(result);
    }

    async has(): Promise<boolean> {
        return (await this.get()) !== null;
    }
}