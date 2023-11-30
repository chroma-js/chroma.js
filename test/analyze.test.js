import assert from 'assert';
import { analyze } from '../src/utils/analyze.js';

describe('Some tests for analyze()', () => {
    describe('analyze an array of numbers', () => {
        const topic = analyze([1, 2, 2, 3, 4, 5]);
        test('sum is 17', () => {
            assert.equal(topic.sum, 17);
        });
        test('count is 6', () => {
            assert.equal(topic.count, 6);
        });
        test('maximum is 5', () => {
            assert.equal(topic.max, 5);
        });
        test('minumum is 1', () => {
            assert.equal(topic.min, 1);
        });
        test('domain is [1,5]', () => {
            assert.deepEqual(topic.domain, [1, 5]);
        });
    });

    describe('analyze an object of numbers', () => {
        const topic = analyze({ a: 1, b: 2, c: 2, d: 3, e: 4, f: 5 });
        test('sum is 17', () => {
            assert.equal(topic.sum, 17);
        });
        test('count is 6', () => {
            assert.equal(topic.count, 6);
        });
        test('maximum is 5', () => {
            assert.equal(topic.max, 5);
        });
        test('minumum is 1', () => {
            assert.equal(topic.min, 1);
        });
        test('domain is [1,5]', () => {
            assert.deepEqual(topic.domain, [1, 5]);
        });
    });

    describe('analyze an array of objects', () => {
        const topic = analyze([{ k: 1 }, { k: 2 }, { k: 2 }, { k: 3 }, { k: 4 }, { k: 5 }], 'k');
        test('sum is 17', () => {
            assert.equal(topic.sum, 17);
        });
        test('count is 6', () => {
            assert.equal(topic.count, 6);
        });
        test('maximum is 5', () => {
            assert.equal(topic.max, 5);
        });
        test('minumum is 1', () => {
            assert.equal(topic.min, 1);
        });
        test('domain is [1,5]', () => {
            assert.deepEqual(topic.domain, [1, 5]);
        });
    });

    describe('analyze an object of objects', () => {
        const topic = analyze(
            { a: { k: 1 }, b: { k: 2 }, c: { k: 2 }, d: { k: 3 }, e: { k: 4 }, f: { k: 5 } },
            'k'
        );
        test('sum is 17', () => {
            assert.equal(topic.sum, 17);
        });
        test('count is 6', () => {
            assert.equal(topic.count, 6);
        });
        test('maximum is 5', () => {
            assert.equal(topic.max, 5);
        });
        test('minumum is 1', () => {
            assert.equal(topic.min, 1);
        });
        test('domain is [1,5]', () => {
            assert.deepEqual(topic.domain, [1, 5]);
        });
    });
});
