import "reflect-metadata";
import {container} from "tsyringe";
import {SearchFileNameRepository} from "./Infrastructure/Repositories/SearchFileNameRepository";
import {UrlRepository} from "./Infrastructure/Repositories/UrlRepository";
import {DomAdapter} from "./Infrastructure/Adapters/DomAdapter";
import {CodeFindingInteractor} from "./Application/UseCases/CodeFindingInteractor";
import {PageContextDetector} from "./Application/Services/PageContextDetector";
import {FileFindingInteractor} from "./Application/UseCases/FileFindingInteractor";
import {IssueFindingInteractor} from "./Application/UseCases/IssueFindingInteractor";
import {GithubApiAdapter} from "./Infrastructure/Adapters/GithubApiAdapter";
import {AppInitializationInteractor} from "./Application/UseCases/AppInitializationInteractor";
import {StateProvider} from "./Application/Services/StateProvider";
import {FileFindPageOpeningInteractor} from "./Application/UseCases/FileFindPageOpeningInteractor";
import {KeyDetector} from "./Application/Services/KeyDetector";
import {HotkeyRepository} from "./Infrastructure/Repositories/HotkeyRepository";
import {RepoAccessHistoryRepository} from "./Infrastructure/Repositories/RepoAccessHistoryRepository";
import {Storage} from "./Infrastructure/Repositories/Storage";
import {FuzzyMatcher} from "./Application/Services/FuzzyMatcher";
import {UserNameRepository} from "./Infrastructure/Repositories/UserNameRepository";

const isInTest = typeof global.it === 'function';

// Application Layer
container.register("CodeFindingInteractor", {useClass: CodeFindingInteractor});
container.register("FileFindingInteractor", {useClass: FileFindingInteractor});
container.register("IssueFindingInteractor", {useClass: IssueFindingInteractor});
container.register("FileFindPageOpeningInteractor", {useClass: FileFindPageOpeningInteractor});
container.register("PageContextDetector", {useClass: PageContextDetector});
container.register("AppInitializationInteractor", {useClass: AppInitializationInteractor});
container.register("StateProvider", {useClass: StateProvider});
container.register("KeyDetector", {useClass: KeyDetector});
container.register("FuzzyMatcher", {useClass: FuzzyMatcher});

// Infrastructure Layer
container.register("IStorage", {useClass: Storage });
container.register("ISearchFileNameRepository", {useClass: SearchFileNameRepository});
container.register("IUrlRepository", {useClass: UrlRepository});
container.register("IDomAdapter", {useClass: DomAdapter});
container.register("IGithubApiAdapter", {useClass: GithubApiAdapter});
container.register("IHotkeyRepository", {useClass: HotkeyRepository});
container.register("IRepoAccessHistoryRepository", {useClass: RepoAccessHistoryRepository});
container.register("IUserNameRepository", {useClass: UserNameRepository});