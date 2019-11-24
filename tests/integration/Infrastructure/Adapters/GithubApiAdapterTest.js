import "../../../../src/Application/setup-container";
import {container} from "tsyringe";
import {STATE} from "../../../../src/Application/state";
import {setupStore} from "../../../../src/Application/store";

const assert = require('assert');

describe('GithubApiAdapter#fetchRepoDetail', () => {
    it('fetchRepoDetail', async () => {
        /*
         * Prepare
         */

        /*
         * Run
         */
        const adapter = container.resolve('IGithubApiAdapter');
        const detail = await adapter.fetchRepoDetail('t-kuni', 'github-fast-traveler');

        /*
         * Assert
         */
        assert.equal('master', detail.default_branch);
    });
});