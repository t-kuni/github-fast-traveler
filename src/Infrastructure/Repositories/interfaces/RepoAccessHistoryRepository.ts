import RepoAccessHistory from "../../../Domain/ValueObjects/RepoAccessHistory";

export interface IRepoAccessHistoryRepository {
    save(history: Array<RepoAccessHistory>): Promise<any>;

    get(): Promise<Array<RepoAccessHistory>>;

    has(): Promise<boolean>;
}