export interface ISearchFileNameRepository {
    save(fileName:string): void;

    get(): string;

    clear(): void;
}