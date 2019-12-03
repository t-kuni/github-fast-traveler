export interface IStorage {
    set(key: string, value: any): Promise<null>;

    get(key: string): Promise<any>;
}