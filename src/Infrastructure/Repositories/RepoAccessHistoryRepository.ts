import RepoAccessHistory from "../../Domain/ValueObjects/RepoAccessHistory";
import {IRepoAccessHistoryRepository} from "./interfaces/IRepoAccessHistoryRepository";
import {inject, injectable} from "tsyringe";
import {IStorage} from "./interfaces/IStorage";

@injectable()
export class RepoAccessHistoryRepository implements IRepoAccessHistoryRepository {
    private storage: IStorage;

    constructor(@inject('IStorage') storage: IStorage) {
        this.storage = storage;
    }

    key(): string {
        return 'chrome_extension:github_fast_traveler:repo_access_history';
    }

    save(history: Array<RepoAccessHistory>): void {
        const key = this.key();
        const value = history.map((h: RepoAccessHistory) => h.toJSON());

        this.storage.set(key, value);
    }

    async get(): Promise<Array<RepoAccessHistory>> {
        const result = await this.storage.get(this.key());

        return result.map((r) => RepoAccessHistory.fromJSON(r));
    }

    async has(): Promise<boolean> {
        return (await this.get()) !== null;
    }
}