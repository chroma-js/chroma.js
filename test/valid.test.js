import assert from 'assert';
import chroma from '../index.js';

describe('Some tests for chroma.valid', () => {
    describe('valid color', () => {
        const topic = chroma.valid('red');
        test('is true', () => {
            assert(topic);
        });
    });
    describe('invalid color', () => {
        const topic = chroma.valid('bread');
        test('is false', () => {
            assert(!topic);
        });
    });
});
