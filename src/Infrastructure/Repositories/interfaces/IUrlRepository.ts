export interface IUrlRepository {
    getPath(): string;

    save(url: string): void;
}