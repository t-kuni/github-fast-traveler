import "../../../../src/Application/setup-container";
import {container} from "tsyringe";

const assert = require('assert');

/*
 * This test is not work, i don't know why but because axios' adapter is set to undefined.
 * I suspicious to had happen anything in axios' getDefaultAdapter function.
 */
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