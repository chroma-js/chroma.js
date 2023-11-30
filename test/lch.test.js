import assert from 'assert';
import chroma from '../index.js';

describe('Some tests for chroma.lch()', () => {
    describe('lch grayscale', () => {
        const t = (() => {
            const result = [];
            for (let l of [0, 100, 25, 50, 75]) {
                result.push([l, 0, 0]);
            }
            return result;
        })();
        test('black', () => {
            assert.equal(chroma.lch(t[0]).hex(), '#000000');
        });
        test('white', () => {
            assert.equal(chroma.lch(t[1]).hex(), '#ffffff');
        });
        test('gray 1', () => {
            assert.equal(chroma.lch(t[2]).hex(), '#3b3b3b');
        });
        test('gray 2', () => {
            assert.equal(chroma.lch(t[3]).hex(), '#777777');
        });
        test('gray 3', () => {
            assert.equal(chroma.lch(t[4]).hex(), '#b9b9b9');
        });
    });

    describe('lch hues', () => {
        const t = [0, 60, 120, 180, 240, 300].map(h => [50, 70, h]);
        test('red-ish', () => {
            assert.equal(chroma.lch(t[0]).hex(), '#dc2c7a');
        });
        test('yellow-ish', () => {
            assert.equal(chroma.lch(t[1]).hex(), '#bd5c00');
        });
        test('green-ish', () => {
            assert.equal(chroma.lch(t[2]).hex(), '#548400');
        });
        test('teal-ish', () => {
            assert.equal(chroma.lch(t[3]).hex(), '#009175');
        });
        test('blue-ish', () => {
            assert.equal(chroma.lch(t[4]).hex(), '#008cde');
        });
        test('purple-ish', () => {
            assert.equal(chroma.lch(t[5]).hex(), '#6f67df');
        });
    });

    describe('clipping', () => {
        const t = (() => {
            const result1 = [];
            for (l of [20, 40, 60, 80, 100]) {
                result1.push(chroma.hcl(50, 40, l));
            }
            return result1;
        })();
        test('20-clipped', () => {
            assert.equal(t[0].clipped(), true);
        });
        test('40-not clipped', () => {
            assert.equal(t[1].clipped(), false);
        });
        test('60-not clipped', () => {
            assert.equal(t[2].clipped(), false);
        });
        test('80-clipped', () => {
            assert.equal(t[3].clipped(), true);
        });
        test('100-clipped', () => {
            assert.equal(t[4].clipped(), true);
        });
    });
});
