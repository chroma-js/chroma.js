import assert from 'assert';
import chroma from '../index.js';

describe('Some tests for random colors', () => {
    describe('random colors', () => {
        const topic = chroma.random();
        test('valid hex code', () => {
            assert(/^#[0-9a-f]{6}$/i.test(topic.hex()));
        });
    });
});
