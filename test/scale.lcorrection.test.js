import assert from 'assert';
import chroma from '../index.js';

describe('Testing lightess correction', () => {
    describe('simple two color linear interpolation', () => {
        const topic = {
            f: chroma.scale(['white', 'black']).mode('lab')
        };
        test('center L is 50', () => {
            assert.equal(Math.round(topic.f(0.5).lab()[0]), 50);
        });
    });

    describe('hot - w/o correction', () => {
        const topic = {
            f: chroma.scale(['white', 'yellow', 'red', 'black']).mode('lab')
        };
        test('center L is 74', () => {
            assert.equal(Math.round(topic.f(0.5).lab()[0]), 74);
        });
    });

    describe('hot - with correction', () => {
        const topic = {
            f: chroma.scale(['white', 'yellow', 'red', 'black']).mode('lab').correctLightness(true)
        };
        test('center L is 50', () => {
            assert.equal(Math.round(topic.f(0.5).lab()[0]), 50);
        });
    });

    describe('hot - w/o correction - domained [0,100]', () => {
        const topic = {
            f: chroma.scale(['white', 'yellow', 'red', 'black']).domain([0, 100]).mode('lab')
        };
        test('center L is 74', () => {
            assert.equal(Math.round(topic.f(50).lab()[0]), 74);
        });
    });

    describe('hot - with correction - domained [0,100]', () => {
        const topic = {
            f: chroma
                .scale(['white', 'yellow', 'red', 'black'])
                .domain([0, 100])
                .mode('lab')
                .correctLightness(true)
        };
        test('center L is 50', () => {
            assert.equal(Math.round(topic.f(50).lab()[0]), 50);
        });
    });

    describe('hot - w/o correction - domained [0,20,40,60,80,100]', () => {
        const topic = {
            f: chroma
                .scale(['white', 'yellow', 'red', 'black'])
                .domain([0, 20, 40, 60, 80, 100])
                .mode('lab')
        };
        test('center L is 74', () => {
            assert.equal(Math.round(topic.f(50).lab()[0]), 74);
        });
    });

    describe('hot - with correction - domained [0,20,40,60,80,100]', () => {
        const topic = {
            f: chroma
                .scale(['white', 'yellow', 'red', 'black'])
                .domain([0, 20, 40, 60, 80, 100])
                .mode('lab')
                .correctLightness(true)
        };
        test('center L is 50', () => {
            assert.equal(Math.round(topic.f(50).lab()[0]), 50);
        });
    });
});
