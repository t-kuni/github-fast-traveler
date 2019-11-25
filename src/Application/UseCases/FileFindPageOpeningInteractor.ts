import {inject, injectable} from "tsyringe";
import {PageContextDetector} from "../Services/PageContextDetector";
import {IUrlRepository} from "../../Infrastructure/Repositories/interfaces/IUrlRepository";
import {STATE} from "../state";
import {ISearchFileNameRepository} from "../../Infrastructure/Repositories/interfaces/ISearchFileNameRepository";
import {IDomAdapter} from "../../Infrastructure/Adapters/interfaces/IDomAdapter";

@injectable()
export class FileFindPageOpeningInteractor {
    private pageContext: PageContextDetector;
    private domAdapter: IDomAdapter;
    private fileNameRepo: ISearchFileNameRepository;

    constructor(@inject('PageContextDetector') pageContext: PageContextDetector,
                @inject('ISearchFileNameRepository') fileNameRepo: ISearchFileNameRepository,
                @inject('IDomAdapter') domAdapter: IDomAdapter
    ) {
        this.domAdapter = domAdapter;
        this.fileNameRepo = fileNameRepo;
        this.pageContext = pageContext;
    }

    onOpen() {
        const fileName = this.fileNameRepo.get();
        this.domAdapter.setFileNameInFileFindPage(fileName);
        this.fileNameRepo.clear();
    }
}