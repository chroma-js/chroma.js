import assert from 'assert';
import '../src/io/named/index.js';
import contrast from '../src/utils/contrast.js';

describe('Testing contrast ratio', () => {
    describe('maximum contrast', () => {
        const topic = contrast('black', 'white');
        test('is 21:1', () => {
            assert.equal(topic, 21);
        });
    });
    describe('minimum contrast', () => {
        const topic = contrast('white', 'white');
        test('is 1:1', () => {
            assert.equal(topic, 1);
        });
    });
    describe('contrast between white and red', () => {
        const topic = contrast('red', 'white');
        test('is 4:1', () => {
            assert.equal(Math.round(topic), 4);
        });
    });
});
