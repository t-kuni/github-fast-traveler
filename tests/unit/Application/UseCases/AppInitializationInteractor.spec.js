import "../../../../src/setup_container";
import {container} from "tsyringe";
import {STATE} from "../../../../src/Application/state";
import {setupStore} from "../../../../src/Application/store";

const assert = require('assert');

describe('AppInitializationInteractor#initialize', () => {
    it('initialize', async () => {
        /*
         * Prepare
         */
        container.register('IUrlRepository', {
            useValue: {
                getPath() {
                    return '/test-owner/test-repo';
                },
            }
        });
        container.register('IGithubApiAdapter', {
            useValue: {
                fetchRepoDetail() {
                    return {
                        name: 'test-repo'
                    }
                }
            }
        });

        const store = setupStore();

        /*
         * Run
         */
        const interactor = container.resolve('AppInitializationInteractor');
        await interactor.initialize();

        /*
         * Assert
         */
        const expect = {
            name: 'test-repo'
        };
        assert.deepEqual(store.state[STATE.CURRENT_REPO_DETAIL], expect);
    });
});