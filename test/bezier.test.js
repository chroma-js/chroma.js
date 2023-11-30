import assert from 'assert';
import chroma from '../index.js';

describe('Testing bezier interpolation', () => {
    describe('simple two color linear interpolation', () => {
        const topic = {
            f: chroma.bezier(['white', 'black'])
        };
        test('starts from white', () => {
            assert.equal(topic.f(0).hex(), '#ffffff');
        });
        test('ends in black', () => {
            assert.equal(topic.f(1).hex(), '#000000');
        });
        test('center is grey', () => {
            assert.equal(topic.f(0.5).hex(), '#777777');
        });
    });

    describe('two color linear interpolation with alpha', () => {
        const topic = {
            f: chroma.bezier(['white', chroma('black').alpha(0)])
        };
        test('starts from white', () => {
            assert.equal(topic.f(0).hex(), '#ffffff');
        });
        test('ends in transparent black', () => {
            assert.equal(topic.f(1).hex(), '#00000000');
        });
        test('center is transluscent grey', () => {
            assert.equal(topic.f(0.5).hex(), '#77777780');
        });
    });

    describe('three color quadratic bezier interpolation', () => {
        const topic = {
            f: chroma.bezier(['white', 'red', 'black'])
        };
        test('starts from white', () => {
            assert.equal(topic.f(0).hex(), '#ffffff');
        });
        test('ends in black', () => {
            assert.equal(topic.f(1).hex(), '#000000');
        });
        test('center is a greyish red', () => {
            assert.equal(topic.f(0.5).hex(), '#c45c44');
        });
    });

    describe('three color quadratic bezier interpolation with alpha', () => {
        const topic = {
            f: chroma.bezier(['white', chroma('red').alpha(0.5), chroma('black').alpha(0)])
        };
        test('starts from white', () => {
            assert.equal(topic.f(0).hex(), '#ffffff');
        });
        test('ends in transparent black', () => {
            assert.equal(topic.f(1).hex(), '#00000000');
        });
        test('center is a transluscent greyish red', () => {
            assert.equal(topic.f(0.5).hex(), '#c45c4480');
        });
    });

    describe('four color cubic bezier interpolation', () => {
        const topic = {
            f: chroma.bezier(['white', 'yellow', 'red', 'black'])
        };
        test('starts from white', () => {
            assert.equal(topic.f(0).hex(), '#ffffff');
        });
        test('ends in black', () => {
            assert.equal(topic.f(1).hex(), '#000000');
        });
        test('1st quarter', () => {
            assert.equal(topic.f(0.25).hex(), '#ffe085');
        });
        test('center', () => {
            assert.equal(topic.f(0.5).hex(), '#e69735');
        });
        test('3rd quarter', () => {
            assert.equal(topic.f(0.75).hex(), '#914213');
        });
    });

    describe('four color cubic bezier interpolation with alpha', () => {
        const topic = {
            f: chroma.bezier([
                'white',
                chroma('yellow').alpha(1 / 3),
                chroma('red').alpha(2 / 3),
                chroma('black').alpha(0)
            ])
        };
        test('starts from white', () => {
            assert.equal(topic.f(0).hex(), '#ffffff');
        });
        test('ends in transparent black', () => {
            assert.equal(topic.f(1).hex(), '#00000000');
        });
        test('1st quarter', () => {
            assert.equal(topic.f(0.25).hex(), '#ffe085a7');
        });
        test('center', () => {
            assert.equal(topic.f(0.5).hex(), '#e6973580');
        });
        test('3rd quarter', () => {
            assert.equal(topic.f(0.75).hex(), '#91421358');
        });
    });

    describe('five color diverging n-1-degree bezier interpolation', () => {
        const topic = {
            f: chroma.bezier(['darkred', 'orange', 'snow', 'lightgreen', 'royalblue'])
        };
        test('starts from darkred', () => {
            assert.equal(topic.f(0).hex(), '#8b0000');
        });
        test('ends in royalblue', () => {
            assert.equal(topic.f(1).hex(), '#4169e1');
        });
        test('center is snow', () => {
            assert.equal(topic.f(0.5).hex(), '#dfcb98');
        });
        test('1st quarter', () => {
            assert.equal(topic.f(0.25).hex(), '#dd8d49');
        });
        test('3rd quarter', () => {
            assert.equal(topic.f(0.75).hex(), '#a7c1bd');
        });
    });

    // One of the next two tests is incorrect. ///////////////////////////
    // regorxxx test
    describe('five color diverging n-1-degree bezier interpolation with alpha', () => {
        const topic = {
            f: chroma.bezier([
                'darkred',
                chroma('orange').alpha(0.75),
                chroma('snow').alpha(0.5),
                chroma('lightgreen').alpha(0.25),
                chroma('royalblue').alpha(0)
            ])
        };
        test('starts from darkred', () => {
            assert.equal(topic.f(0).hex(), '#8b0000');
        });
        test('ends in transparent royalblue', () => {
            assert.equal(topic.f(1).hex(), '#4169e100');
        });
        test('center is snow', () => {
            assert.equal(topic.f(0.5).hex(), '#dfcb9880');
        });
        test('1st quarter', () => {
            assert.equal(topic.f(0.25).hex(), '#dd8d49bf');
        });
        test('3rd quarter', () => {
            assert.equal(topic.f(0.75).hex(), '#a7c1bd40');
        });
    });
    // taisukef test
    describe('five color diverging quadratic bezier interpolation', () => {
        const topic = {
            f: chroma.bezier([
                'darkred',
                chroma('orange').alpha(0.75),
                chroma('snow').alpha(0.5),
                chroma('lightgreen').alpha(0.25),
                chroma('royalblue').alpha(0)
            ])
        };
        test('starts from darkred', () => {
            assert.equal(topic.f(0).hex(), '#8b0000');
        });
        test('ends in transparent royalblue', () => {
            assert.equal(topic.f(1).hex(), '#4169e100');
        });
        test('center is snow', () => {
            assert.equal(topic.f(0.5).hex(), '#fffafa80');
        });
        test('1st quarter', () => {
            assert.equal(topic.f(0.25).hex(), '#e9954ebf');
        });
        test('3rd quarter', () => {
            assert.equal(topic.f(0.75).hex(), '#a6cfc140');
        });
    });
    // ///////////////////////////////////////////////////////////////////

    // One of the next two tests is incorrect. ///////////////////////////
    // regorxxx test
    describe('using bezier in a chroma.scale', () => {
        const topic = {
            f: chroma
                .scale(chroma.bezier(['darkred', 'orange', 'snow', 'lightgreen', 'royalblue']))
                .domain([0, 1], 5)
                .out('hex')
        };
        test('starts from darkred', () => {
            assert.equal(topic.f(0), '#8b0000');
        });
        test('ends in royalblue', () => {
            assert.equal(topic.f(1), '#4169e1');
        });
        test('center is snow', () => {
            assert.equal(topic.f(0.5), '#dfcb98');
        });
        test('1st quarter', () => {
            assert.equal(topic.f(0.25), '#dd8d49');
        });
        test('3rd quarter', () => {
            assert.equal(topic.f(0.75), '#a7c1bd');
        });
    });
    // taisukef test
    describe('using bezier in a chroma.scale (2)', () => {
        const topic = {
            f: chroma
                .scale(chroma.bezier(['darkred', 'orange', 'snow', 'lightgreen', 'royalblue']))
                .domain([0, 1], 5)
                .out('hex')
        };
        test('starts from darkred', () => {
            assert.equal(topic.f(0), '#8b0000');
        });
        test('ends in royalblue', () => {
            assert.equal(topic.f(1), '#4169e1');
        });
        test('center is snow', () => {
            assert.equal(topic.f(0.5), '#fffafa');
        });
        test('1st quarter', () => {
            assert.equal(topic.f(0.25), '#e9954e');
        });
        test('3rd quarter', () => {
            assert.equal(topic.f(0.75), '#a6cfc1');
        });
    });
});
