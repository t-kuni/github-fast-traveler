import "../../../../src/Application/setup-container";
import {container} from "tsyringe";

const assert = require('assert');

describe('CodeFindingInteractor#find', () => {
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

        /*
         * Run
         */
        const interactor = container.resolve('CodeFindingInteractor');
        interactor.find('current-repo', 'search-word');

        /*
         * Assert
         */
        const expect = 'https://github.com/search?q=repo:test-owner/test-repo search-word&type=Code';
        assert.equal(toUrl, expect);
    });
});