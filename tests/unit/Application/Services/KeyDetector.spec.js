import "../../../../src/Application/setup-container";
import {container} from "tsyringe";
import {STATE} from "../../../../src/Application/state";
import {setupStore} from "../../../../src/Application/store";

const assert = require('assert');

describe('KeyDetector', () => {
    it('aaa', async () => {
        /*
         * Prepare
         */

        /*
         * Run
         */
        const detector = container.resolve('KeyDetector');
        detector.onKeyDown(70);
        detector.onKeyDown(17);
        detector.onKeyDown(16);
        detector.onKeyUp(17);
        detector.onKeyDown(17);
        detector.onKeyUp(17);
        const actual = detector.getHotkey();

        /*
         * Assert
         */
        assert.deepEqual(actual, 'ctrl+shift+f');
    });

    it('bbb', async () => {
        /*
         * Prepare
         */

        /*
         * Run
         */
        const detector = container.resolve('KeyDetector');
        detector.onKeyDown(70);
        detector.onKeyDown(17);
        detector.onKeyDown(16);
        detector.clear();
        detector.onKeyDown(18);
        detector.onKeyDown(80);
        const actual = detector.getHotkey();

        /*
         * Assert
         */
        assert.deepEqual(actual, 'alt+p');
    });
});