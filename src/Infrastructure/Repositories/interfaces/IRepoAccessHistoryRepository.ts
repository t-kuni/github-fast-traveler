import RepoAccessHistory from "../../../Domain/ValueObjects/RepoAccessHistory";

export interface IRepoAccessHistoryRepository {
    save(history: Array<RepoAccessHistory>): void;

    get(): Promise<Array<RepoAccessHistory>>;

    has(): Promise<boolean>;
}