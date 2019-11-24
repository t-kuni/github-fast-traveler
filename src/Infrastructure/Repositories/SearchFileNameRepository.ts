import {ISearchFileNameRepository} from "./interfaces/ISearchFileNameRepository";

export class SearchFileNameRepository implements ISearchFileNameRepository {
    key(): string {
        return 'chrome_extension:github_fast_traveler:search_file_name';
    }

    save(fileName: string): void {
        localStorage.setItem(this.key(), fileName);
    }

    get(): string {
        return localStorage.getItem(this.key());
    }

    clear(): void {
        localStorage.removeItem(this.key());
    }
}