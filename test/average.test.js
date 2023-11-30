import assert from 'assert';
import chroma from '../index.js';

const colors = [
    [125, 133, 127],
    [131, 127, 134],
    [138, 121, 141],
    [144, 114, 147],
    [149, 107, 153],
    [165, 83, 170],
    [160, 92, 164],
    [170, 73, 175],
    [175, 62, 180],
    [155, 100, 159]
];

describe('Testing color averaging modes', () => {
    describe('avg some colors', () => {
        const topic = ['red', 'blue'];
        test('is #5a0000', () => {
            assert.equal(chroma.average(topic).hex(), chroma.mix(topic[0], topic[1]).hex());
        });
    });
    describe('three colors', () => {
        const topic = chroma.average(['blue', 'red', 'white'], 'rgb');
        test('is #5a0000', () => {
            assert.equal(topic.hex(), '#aa55aa');
        });
    });
    describe('alpha avg', () => {
        const topic = chroma.average(['rgba(0,0,0,0)', 'red'], 'rgb');
        test('is #5a0000', () => {
            assert.deepEqual(topic.rgba(), [128, 0, 0, 0.5]);
        });
        test('is #5a0000-2', () => {
            assert.deepEqual(topic.rgba(false), [127.5, 0, 0, 0.5]);
        });
    });
    describe('average in lab', () => {
        const topic = chroma.average(['blue', 'red', 'white'], 'lab');
        test('is #5a0000', () => {
            assert.equal(topic.hex(), '#e26daf');
        });
    });
    describe('average h in lch', () => {
        const topic = chroma
            .average([chroma.lch(50, 50, 0), chroma.lch(50, 50, 90)], 'lch')
            .get('lch.h');
        test('is approximately 45', () => {
            assert.equal(Math.round(topic), 45);
        });
    });
    describe('average in hsl of same colors', () => {
        const topic = chroma.average(['#02c03a', '#02c03a'], 'hsl');
        test('is same', () => {
            assert.equal(topic.hex(), '#02c03a');
        });
    });
    describe('average same color', () => {
        const topic = chroma.average(['#02c03a', '#02c03a'], 'hsl');
        test('is #02c03a', () => {
            assert.equal(topic.hex(), '#02c03a');
        });
    });
    describe('lrgb avergage', () => {
        const topic = chroma.average(colors, 'lrgb');
        test('is ???', () => {
            assert.equal(topic.hex(), '#98689c');
        });
    });
    describe('three colors, weighted rgb average', () => {
        const topic = chroma.average(['blue', 'red', 'white'], 'rgb', [1, 1, 2]);
        test('is #bf80bf', () => {
            assert.equal(topic.hex(), '#bf80bf');
        });
    });
    describe('three colors, weighted lrgb average', () => {
        const topic = chroma.average(['blue', 'red', 'white'], 'lrgb', [1, 3, 2]);
        test('is #e993b4', () => {
            assert.equal(topic.hex(), '#e993b4');
        });
    });
    describe('three colors, weighted hsl average', () => {
        const topic = chroma.average(['blue', 'red', 'white'], 'hsl', [0.25, 1, 0.5]);
        test('is #e58263', () => {
            assert.equal(topic.hex(), '#e56381');
        });
    });
});
