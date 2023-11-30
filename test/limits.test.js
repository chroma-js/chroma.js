import assert from 'assert';
import { limits } from '../src/utils/analyze.js';

describe('Some tests for chroma.limits()', () => {
    describe('simple continuous domain', () => {
        const topic = limits([1, 2, 3, 4, 5], 'continuous');
        test('domain', () => {
            assert.deepEqual(topic, [1, 5]);
        });
    });

    describe('continuous domain, negative values', () => {
        const topic = limits([1, -2, -3, 4, 5], 'continuous');
        test('domain', () => {
            assert.deepEqual(topic, [-3, 5]);
        });
    });

    describe('continuous domain, null values', () => {
        const topic = limits([1, undefined, null, 4, 5], 'continuous');
        test('domain', () => {
            assert.deepEqual(topic, [1, 5]);
        });
    });

    describe('equidistant domain', () => {
        const topic = limits([0, 10], 'equidistant', 5);
        test('domain', () => {
            assert.deepEqual(topic, [0, 2, 4, 6, 8, 10]);
        });
    });

    describe('equidistant domain, NaN values', () => {
        const topic = limits([0, 9, 3, 6, 3, 5, undefined, Number.NaN, 10], 'equidistant', 5);
        test('domain', () => {
            assert.deepEqual(topic, [0, 2, 4, 6, 8, 10]);
        });
    });

    describe('logarithmic domain', () => {
        const topic = limits([1, 10000], 'log', 4);
        test('domain', () => {
            assert.deepEqual(topic, [1, 10, 100, 1000, 10000]);
        });
    });

    describe('logarithmic domain - non-positive values', () => {
        const topic = [-1, 10000];
        test('domain', () => {
            assert.throws(
                () => limits(topic, 'log', 4),
                'Logarithmic scales should only be possible for values > 0'
            );
        });
    });

    describe('quantiles domain', () => {
        const topic = limits([1, 2, 3, 4, 5, 10, 20, 100], 'quantiles', 2);
        test('domain', () => {
            assert.deepEqual(topic, [1, 4.5, 100]);
        });
    });

    describe('quantiles not enough values', () => {
        const topic = limits([0, 1], 'quantiles', 5);
        test('domain', () => {
            assert.deepEqual(topic, [0, 0.2, 0.4, 0.6, 0.8, 1]);
        });
    });
});
