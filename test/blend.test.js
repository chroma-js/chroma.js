import assert from 'assert';
import chroma from '../index.js';

describe('Testing blend modes', () => {
    describe('multiply 1', () => {
        const topic = chroma.blend('red', '#5a9f37', 'multiply');
        test('is #5a0000', () => {
            assert.equal(topic.hex(), '#5a0000');
        });
    });
    describe('multiply 2', () => {
        const topic = chroma.blend('#33b16f', '#857590', 'multiply');
        test('is #1a513e', () => {
            assert.equal(topic.hex(), '#1b513f');
        });
    });
    describe('screen', () => {
        const topic = chroma.blend('#b83d31', '#0da671', 'screen');
        test('is #bbbb8c', () => {
            assert.equal(topic.hex(), '#bcbb8c');
        });
    });
    describe('overlay', () => {
        const topic = chroma.blend('#b83d31', '#0da671', 'overlay');
        test('is #784f2b', () => {
            assert.equal(topic.hex(), '#784f2b');
        });
    });
});
