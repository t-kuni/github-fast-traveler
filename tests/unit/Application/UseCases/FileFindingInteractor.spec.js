import "../../../../src/Application/setup-container";
import {container} from "tsyringe";

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