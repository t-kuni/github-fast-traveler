import {container, inject, injectable} from "tsyringe";
import {IUserNameRepository} from "../../Infrastructure/Repositories/interfaces/IUserNameRepository";
import {IPageContextDetector} from "./interfaces/IPageContextDetector";

@injectable()
export class PopupPageContextDetector implements IPageContextDetector {
    private userNameRepo: IUserNameRepository;

    constructor(@inject('IUserNameRepository') userNameRepo: IUserNameRepository) {
        this.userNameRepo = userNameRepo;
    }

    getRepoName() {
        return null;
    }

    hasRepoName() {
        return false;
    }

    getRepoOwnerName() {
        return null;
    }

    hasRepoOwnerName() {
        return false
    }

    getLoginName() {
        return this.userNameRepo.get();
    }

    hasLoginName() {
        return this.userNameRepo.has();
    }

    getSelectingText() {
        return "";
    }

    isFileFindPage() {
        return false;
    }
}