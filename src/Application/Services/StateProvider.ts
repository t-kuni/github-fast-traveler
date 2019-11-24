import {inject, injectable} from "tsyringe";
import {IUrlRepository} from "../../Infrastructure/Repositories/interfaces/IUrlRepository";
import {IDomAdapter} from "../../Infrastructure/Adapters/interfaces/IDomAdapter";

@injectable()
export class PageContextDetector {
    private urlRepo: IUrlRepository;
    private domAdapter: IDomAdapter;

    constructor(@inject('IUrlRepository') urlRepo: IUrlRepository,
                @inject('IDomAdapter') domAdapter: IDomAdapter) {
        this.domAdapter = domAdapter;
        this.urlRepo = urlRepo;
    }

    provide() {
        return
    }
}