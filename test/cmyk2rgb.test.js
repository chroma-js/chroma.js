import assert from 'assert';
import cmyk2rgb from '../src/io/cmyk/cmyk2rgb.js';

describe('Testing CMYK color conversions', () => {
    describe('parse simple CMYK colors', () => {
        const topic = [
            [0, 0, 0, 1],
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 0, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 1, 0],
            [1, 0, 0, 0],
            [0, 1, 0, 0]
        ];
        test('black', () => {
            assert.deepEqual(cmyk2rgb(topic[0]), [0, 0, 0, 1]);
        });
        test('white', () => {
            assert.deepEqual(cmyk2rgb(topic[1]), [255, 255, 255, 1]);
        });
        test('red', () => {
            assert.deepEqual(cmyk2rgb(topic[2]), [255, 0, 0, 1]);
        });
        test('green', () => {
            assert.deepEqual(cmyk2rgb(topic[3]), [0, 255, 0, 1]);
        });
        test('blue', () => {
            assert.deepEqual(cmyk2rgb(topic[4]), [0, 0, 255, 1]);
        });
        test('yellow', () => {
            assert.deepEqual(cmyk2rgb(topic[5]), [255, 255, 0, 1]);
        });
        test('cyan', () => {
            assert.deepEqual(cmyk2rgb(topic[6]), [0, 255, 255, 1]);
        });
        test('magenta', () => {
            assert.deepEqual(cmyk2rgb(topic[7]), [255, 0, 255, 1]);
        });
    });
    describe('test unpacked arguments', () => {
        const topic = [
            [0, 0, 0, 1],
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 0, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 1, 0],
            [1, 0, 0, 0],
            [0, 1, 0, 0]
        ];
        test('black', () => {
            assert.deepEqual(cmyk2rgb.apply(null, topic[0]), [0, 0, 0, 1]);
        });
        test('white', () => {
            assert.deepEqual(cmyk2rgb.apply(null, topic[1]), [255, 255, 255, 1]);
        });
        test('red', () => {
            assert.deepEqual(cmyk2rgb.apply(null, topic[2]), [255, 0, 0, 1]);
        });
        test('green', () => {
            assert.deepEqual(cmyk2rgb.apply(null, topic[3]), [0, 255, 0, 1]);
        });
        test('blue', () => {
            assert.deepEqual(cmyk2rgb.apply(null, topic[4]), [0, 0, 255, 1]);
        });
        test('yellow', () => {
            assert.deepEqual(cmyk2rgb.apply(null, topic[5]), [255, 255, 0, 1]);
        });
        test('cyan', () => {
            assert.deepEqual(cmyk2rgb.apply(null, topic[6]), [0, 255, 255, 1]);
        });
        test('magenta', () => {
            assert.deepEqual(cmyk2rgb.apply(null, topic[7]), [255, 0, 255, 1]);
        });
    });
});
