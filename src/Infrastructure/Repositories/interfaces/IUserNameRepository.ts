export interface IUserNameRepository {
    save(userName: string): void;

    get(): Promise<string>;

    has(): Promise<boolean>;
}