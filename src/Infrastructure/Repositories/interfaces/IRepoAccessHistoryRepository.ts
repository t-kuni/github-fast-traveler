import RepoAccessHistory from "../../../Domain/ValueObjects/RepoAccessHistory";
import RepoAccessHistoryList from "../../../Domain/ValueObjects/RepoAccessHistoryList";

export interface IRepoAccessHistoryRepository {
    save(histories: RepoAccessHistoryList): void;

    get(): Promise<RepoAccessHistoryList>;

    has(): Promise<boolean>;
}