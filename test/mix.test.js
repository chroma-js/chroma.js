import assert from 'assert';
import chroma from '../index.js';

describe('Some tests for chroma.color()', () => {
    describe('hsv interpolation white <-> red', () => {
        const topic = chroma('white').interpolate('red', 0.5, 'hsv');
        test('works', () => {
            assert.deepEqual(topic.hex(), '#ff8080');
        });
    });

    describe('use mix as alias', () => {
        const topic = chroma('white').mix('red', 0.5, 'hsv');
        test('works', () => {
            assert.deepEqual(topic.hex(), '#ff8080');
        });
    });

    describe('alternative mix syntax', () => {
        const topic = chroma.mix('red', 'blue', 0.25, 'rgb');
        test('works', () => {
            assert.deepEqual(topic.hex(), '#bf0040');
        });
    });

    describe('hsl interpolation white <-> red', () => {
        const topic = chroma('white').interpolate('red', 0.5, 'hsl');
        test('works', () => {
            assert.deepEqual(topic.hex(), '#ff8080');
        });
    });

    describe('rgb interpolation white <-> red', () => {
        const topic = chroma('white').interpolate('red', 0.5, 'rgb');
        test('works', () => {
            assert.deepEqual(topic.hex(), '#ff8080');
        });
    });

    describe('hsv interpolation red <-> white', () => {
        const topic = chroma('red').interpolate('white', 0.5, 'hsv');
        test('works', () => {
            assert.deepEqual(topic.hex(), '#ff8080');
        });
    });

    describe('hsl interpolation red <-> white', () => {
        const topic = chroma('red').interpolate('white', 0.5, 'hsl');
        test('works', () => {
            assert.deepEqual(topic.hex(), '#ff8080');
        });
    });

    describe('rgb interpolation red <-> white', () => {
        const topic = chroma('red').interpolate('white', 0.5, 'rgb');
        test('works', () => {
            assert.deepEqual(topic.hex(), '#ff8080');
        });
    });

    describe('interpolation short function', () => {
        const topic = {
            f(t) {
                return chroma.interpolate('#ff0000', '#ffffff', t, 'hsv').hex();
            }
        };
        test('starts at red', () => {
            assert.equal(topic.f(0), '#ff0000');
        });
        test('goes over light red', () => {
            assert.equal(topic.f(0.5), '#ff8080');
        });
        test('ends at white', () => {
            assert.equal(topic.f(1), '#ffffff');
        });
    });

    describe('num interpolation white <-> red', () => {
        const topic = chroma(0xffffff).interpolate(0xff0000, 0.5, 'num');
        test('works', () => {
            assert.deepEqual(topic.hex(), '#ff7fff');
        });
    });

    describe('num interpolation red <-> white', () => {
        const topic = chroma(0xff0000).interpolate(0xffffff, 0.5, 'num');
        test('works', () => {
            assert.deepEqual(topic.hex(), '#ff7fff');
        });
    });

    describe('interpolation short function with num provided', () => {
        const topic = {
            f(t) {
                return chroma.interpolate(0xff0000, 0xffffff, t, 'num').hex();
            }
        };
        test('starts at red', () => {
            assert.equal(topic.f(0), '#ff0000');
        });
        test('goes over light red', () => {
            assert.equal(topic.f(0.5), '#ff7fff');
        });
        test('ends at white', () => {
            assert.equal(topic.f(1), '#ffffff');
        });
    });

    describe('interpolate in num', () => {
        const topic = chroma.interpolate(chroma.num(0xffffe0), chroma.num(0x102180), 0.5, 'num');
        test('hex', () => {
            assert.equal(topic.hex(), '#8810b0');
        });
        test('num', () => {
            assert.equal(topic.num(), 8917168);
        });
    });

    describe('interpolate in hsv', () => {
        const topic = chroma.interpolate('white', 'black', 0.5, 'hsv');
        test('hex', () => {
            assert.equal(topic.hex(), '#808080');
        });
    });

    describe('interpolate in hsl', () => {
        const topic = chroma.interpolate('lightyellow', 'navy', 0.5, 'hsl');
        test('hex', () => {
            assert.equal(topic.hex(), '#31ff98');
        });
    });

    describe('interpolate in lrgb', () => {
        const topic = chroma.interpolate('red', 'blue', 0.5, 'lrgb');
        test('hex', () => {
            assert.equal(topic.hex(), '#b400b4');
        });
    });
});
