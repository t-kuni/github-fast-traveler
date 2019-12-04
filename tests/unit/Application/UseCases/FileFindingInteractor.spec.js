import "../../../../src/setup_container";
import {container} from "tsyringe";
import {STATE} from "../../../../src/Application/state";
import {setupStore} from "../../../../src/Application/store";

const assert = require('assert');

describe('FileFindingInteractor#find', () => {
    it('find_', () => {
        /*
         * Prepare
         */
        let toUrl = null;
        container.register('IUrlRepository', {
            useValue: {
                getPath() {
                    return '/test-owner/test-repo';
                },
                save(url) {
                    toUrl = url;
                }
            }
        });
        container.register('IDomAdapter', {
            useValue: {
                getSelectingText() {
                    return 'search-word';
                },
            }
        });
        container.register('ISearchFileNameRepository', {
            useValue: {
                save() {
                }
            }
        });
        container.register('StateProvider', {
            useValue: {
                provide() {
                    return {
                        [STATE.CURRENT_REPO_DETAIL]: {
                            default_branch: 'test-branch'
                        }
                    }
                }
            }
        });

        const store = setupStore();

        /*
         * Run
         */
        const interactor = container.resolve('FileFindingInteractor');
        interactor.find();

        /*
         * Assert
         */
        const expect = 'https://github.com/test-owner/test-repo/find/test-branch';
        assert.equal(toUrl, expect);
    });
});