import assert from 'assert';
import chroma from '../index.js';

const rnd = function (f, d) {
    d = Math.pow(10, d);
    return Math.round(f * d) / d;
};

describe('Testing relative luminance', () => {
    describe('black', () => {
        const topic = chroma('black');
        test('lum = 0', () => {
            assert.equal(topic.luminance(), 0);
        });
    });

    describe('white', () => {
        const topic = chroma('white');
        test('lum = 1', () => {
            assert.equal(topic.luminance(), 1);
        });
    });

    describe('red', () => {
        const topic = chroma('red');
        test('lum = 0.21', () => {
            assert.equal(topic.luminance(), 0.2126);
        });
    });

    describe('yellow brighter than blue', () => {
        const topic = [chroma('yellow').luminance(), chroma('blue').luminance()];
        test('yellow > blue', () => {
            assert(topic[0] > topic[1]);
        });
    });

    describe('green darker than red', () => {
        const topic = [chroma('green').luminance(), chroma('red').luminance()];
        test('green < red', () => {
            assert(topic[0] < topic[1]);
        });
    });

    // setting luminance
    describe('set red luminance to 0.4', () => {
        const topic = chroma('red').luminance(0.4);
        test('lum = 0.4', () => {
            assert.equal(rnd(topic.luminance(), 3), 0.4);
        });
    });

    // setting luminance
    describe('set red luminance to 0', () => {
        const topic = chroma('red').luminance(0);
        test('lum = 0', () => {
            assert.equal(rnd(topic.luminance(), 2), 0);
        });
        test('hex = #000', () => {
            assert.equal(topic.hex(), '#000000');
        });
    });

    // setting luminance
    describe('set black luminance to 0.5', () => {
        const topic = chroma('black').luminance(0.5);
        test('lum = 0.5', () => {
            assert.equal(rnd(topic.luminance(), 2), 0.5);
        });
        test('hex', () => {
            assert.equal('#bcbcbc', topic.hex());
        });
    });

    // setting luminance
    describe('set black luminance to 0.5 (lab)', () => {
        const topic = chroma('black').luminance(0.5, 'lab');
        test('lum = 0.5', () => {
            assert.equal(rnd(topic.luminance(), 2), 0.5);
        });
        test('hex', () => {
            assert.equal('#bcbcbc', topic.hex());
        });
    });

    describe('setting luminance returns new color', () => {
        const topic = chroma('red');
        test('red luminance is 0.21', () => {
            assert.equal(rnd(topic.luminance(), 2), 0.21);
        });
        test('set luminance to 0.4', () => {
            assert.equal(topic.luminance(0.4).hex(), '#ff8686');
        });
        test('old luminance is still 0.21', () => {
            assert.equal(rnd(topic.luminance(), 2), 0.21);
        });
        test('old color is still red', () => {
            assert.equal(topic.hex(), '#ff0000');
        });
    });
});
