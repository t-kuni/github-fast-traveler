export interface IPageContextDetector {
    getRepoName(): string;

    hasRepoName(): boolean;

    getRepoOwnerName(): string;

    hasRepoOwnerName(): boolean;

    getLoginName(): Promise<string>;

    hasLoginName(): Promise<boolean>;

    getSelectingText(): string;

    isFileFindPage(): boolean;
}