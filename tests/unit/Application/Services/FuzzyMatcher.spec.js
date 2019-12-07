import "../../../../src/setup_container";
import {container} from "tsyringe";
import {STATE} from "../../../../src/Application/state";
import {setupStore} from "../../../../src/Application/store";

const assert = require('assert');

describe('FuzzyMatcher', () => {
    it('aaa', async () => {
        /*
         * Prepare
         */

        /*
         * Run
         */
        const matcher = container.resolve('FuzzyMatcher');

        const needle = 'kuniela';
        const target = 't-kuni/elasticlunr-sample';
        const actual = matcher.match(needle, target);

        /*
         * Assert
         */
        assert.deepEqual(actual, true);
    });

    it('bbb', async () => {
        /*
         * Prepare
         */

        /*
         * Run
         */
        const matcher = container.resolve('FuzzyMatcher');

        const needle = 'kunielax';
        const target = 't-kuni/elasticlunr-sample';
        const actual = matcher.match(needle, target);

        /*
         * Assert
         */
        assert.deepEqual(actual, false);
    });

    it('ccc', async () => {
        /*
         * Prepare
         */

        /*
         * Run
         */
        const matcher = container.resolve('FuzzyMatcher');

        const needle = 't-kuni/elasticlunr-sample';
        const target = 't-kuni/elasticlunr-sample';
        const actual = matcher.match(needle, target);

        /*
         * Assert
         */
        assert.deepEqual(actual, true);
    });

    it('ddd', async () => {
        /*
         * Prepare
         */

        /*
         * Run
         */
        const matcher = container.resolve('FuzzyMatcher');

        const needle = 'tkunielasticlunrsample';
        const target = 't-kuni/elasticlunr-sample';
        const actual = matcher.match(needle, target);

        /*
         * Assert
         */
        assert.deepEqual(actual, true);
    });

    it('eee', async () => {
        /*
         * Prepare
         */

        /*
         * Run
         */
        const matcher = container.resolve('FuzzyMatcher');

        const needle = '';
        const target = 't-kuni/elasticlunr-sample';
        const actual = matcher.match(needle, target);

        /*
         * Assert
         */
        assert.deepEqual(actual, true);
    });

    it('fff', async () => {
        /*
         * Prepare
         */

        /*
         * Run
         */
        const matcher = container.resolve('FuzzyMatcher');

        const needle = 'aa';
        const target = 't-kuni/elasticlunr-sample';
        const actual = matcher.match(needle, target);

        /*
         * Assert
         */
        assert.deepEqual(actual, true);
    });

    it('ggg', async () => {
        /*
         * Prepare
         */

        /*
         * Run
         */
        const matcher = container.resolve('FuzzyMatcher');

        const needle = 'aav';
        const target = 't-kuni/elasticlunr-sample';
        const actual = matcher.match(needle, target);

        /*
         * Assert
         */
        assert.deepEqual(actual, false);
    });
});