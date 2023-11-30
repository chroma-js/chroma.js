import assert from 'assert';
import chroma from '../index.js';

describe('Testing color conversions', () => {
    for (let k in chroma.colors) {
        describe(k, () => {
            const topic = chroma.colors[k];
            test('to hsl and back', () => {
                assert.equal(chroma.hsl(chroma(topic).hsl()).hex(), topic);
            });
            test('to cmyk and back', () => {
                assert.equal(chroma.cmyk(chroma(topic).cmyk()).hex(), topic);
            });
            test('to css and back', () => {
                assert.equal(chroma.css(chroma(topic).css()).hex(), topic);
            });
            test('to hsi and back', () => {
                assert.equal(chroma.hsi(chroma(topic).hsi()).hex(), topic);
            });
            test('to hsv and back', () => {
                assert.equal(chroma.hsv(chroma(topic).hsv()).hex(), topic);
            });
            test('to lab and back', () => {
                assert.equal(chroma.lab(chroma(topic).lab()).hex(), topic);
            });
            test('to oklab and back', () => {
                assert.equal(chroma.oklab(chroma(topic).oklab()).hex(), topic);
            });
            test('to lch and back', () => {
                assert.equal(chroma.lch(chroma(topic).lch()).hex(), topic);
            });
            test('to oklch and back', () => {
                assert.equal(chroma.oklch(chroma(topic).oklch()).hex(), topic);
            });
            test('to num and back', () => {
                assert.equal(chroma.num(chroma(topic).num()).hex(), topic);
            });
        });
    }
});
