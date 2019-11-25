export interface IDomAdapter {
    getLoginUserName(): null | any;

    getSelectingText(): string;

    setFileNameInFileFindPage(fileName:string) : void;
}