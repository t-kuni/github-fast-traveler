import {IStorage} from "./interfaces/IStorage";
import {inject, injectable} from "tsyringe";
import {IUserNameRepository} from "./interfaces/IUserNameRepository";

@injectable()
export class UserNameRepository implements IUserNameRepository {
    private storage: IStorage;

    constructor(@inject('IStorage') storage: IStorage) {
        this.storage = storage;
    }

    key(): string {
        return 'chrome_extension:github_fast_traveler:user_name';
    }

    async save(userName: string): Promise<null> {
        const key = this.key();

        if (userName == '') {
            return await this.storage.set(key, null);
        }

        return await this.storage.set(key, userName);
    }

    async get(): Promise<string> {
        return await this.storage.get(this.key());
    }

    async has(): Promise<boolean> {
        return (await this.get()) !== null;
    }
}