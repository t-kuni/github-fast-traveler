import {IUrlRepository} from "./interfaces/IUrlRepository";

export class UrlRepository implements IUrlRepository {
    getPath(): string {
        return location.pathname;
    }

    save(url: string) : void {
        window.open(url);
    }
}