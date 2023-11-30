import assert from 'assert';
import chroma from '../index.js';
import scale from '../src/generator/scale.js';

describe('Some tests for scale()', () => {
    describe('simple rgb scale (white-->black)', () => {
        const topic = {
            f: scale(['white', 'black'])
        };
        test('starts white', () => {
            assert.equal(topic.f(0).hex(), '#ffffff');
        });
        test('mid gray', () => {
            assert.equal(topic.f(0.5).hex(), '#808080');
        });
        test('ends black', () => {
            assert.equal(topic.f(1).hex(), '#000000');
        });
    });

    describe('simple hsv scale (white-->black)', () => {
        const topic = {
            f: scale(['white', 'black']).mode('hsv')
        };
        test('starts white', () => {
            assert.equal(topic.f(0).hex(), '#ffffff');
        });
        test('mid gray', () => {
            assert.equal(topic.f(0.5).hex(), '#808080');
        });
        test('ends black', () => {
            assert.equal(topic.f(1).hex(), '#000000');
        });
        test('colors', () => {
            assert.deepEqual(topic.f.colors(), ['#ffffff', '#000000']);
        });
        test('colors start and end', () => {
            assert.deepEqual(topic.f.colors(2), ['#ffffff', '#000000']);
        });
        test('color mode', () => {
            assert.deepEqual(topic.f.colors(2, 'rgb')[1], [0, 0, 0]);
        });
        test('color mode null len', () => {
            assert.equal(topic.f.colors(2, null).length, 2);
        });
        test('color mode null', () => {
            assert(topic.f.colors(2, null)[0]._rgb);
        });
    });

    describe('simple hsv scale (white-->black), classified', () => {
        const topic = {
            f: scale(['white', 'black']).classes(7).mode('hsv')
        };
        test('starts white', () => {
            assert.equal(topic.f(0).hex(), '#ffffff');
        });
        test('mid gray', () => {
            assert.equal(topic.f(0.5).hex(), '#808080');
        });
        test('ends black', () => {
            assert.equal(topic.f(1).hex(), '#000000');
        });
        test('colors', () => {
            assert.deepEqual(topic.f.colors(7), [
                '#ffffff',
                '#d5d5d5',
                '#aaaaaa',
                '#808080',
                '#555555',
                '#2a2a2a',
                '#000000'
            ]);
        });
    });

    describe('simple lab scale (white-->black)', () => {
        const topic = {
            f: scale(['white', 'black']).mode('lab')
        };
        test('starts white', () => {
            assert.equal(topic.f(0).hex(), '#ffffff');
        });
        test('mid gray', () => {
            assert.equal(topic.f(0.5).hex(), '#777777');
        });
        test('ends black', () => {
            assert.equal(topic.f(1).hex(), '#000000');
        });
    });

    describe('colorbrewer scale', () => {
        const topic = {
            f: scale('RdYlGn')
        };
        test('starts white', () => {
            assert.equal(topic.f(0).hex(), '#a50026');
        });
        test('mid gray', () => {
            assert.equal(topic.f(0.5).hex(), '#ffffbf');
        });
        test('ends black', () => {
            assert.equal(topic.f(1).hex(), '#006837');
        });
    });

    describe('colorbrewer scale - domained', () => {
        const topic = {
            f: scale('RdYlGn').domain([0, 100])
        };
        test('starts white', () => {
            assert.equal(topic.f(0).hex(), '#a50026');
        });
        test('foo', () => {
            assert.notEqual(topic.f(10).hex(), '#ffffbf');
        });
        test('mid gray', () => {
            assert.equal(topic.f(50).hex(), '#ffffbf');
        });
        test('ends black', () => {
            assert.equal(topic.f(100).hex(), '#006837');
        });
    });

    describe('colorbrewer scale - lowercase', () => {
        const topic = {
            f: scale('rdylgn')
        };
        test('starts white', () => {
            assert.equal(topic.f(0).hex(), '#a50026');
        });
        test('mid gray', () => {
            assert.equal(topic.f(0.5).hex(), '#ffffbf');
        });
        test('ends black', () => {
            assert.equal(topic.f(1).hex(), '#006837');
        });
    });

    describe('colorbrewer scale - domained - classified', () => {
        const topic = {
            f: scale('RdYlGn').domain([0, 100]).classes(5)
        };
        test('starts white', () => {
            assert.equal(topic.f(0).hex(), '#a50026');
        });
        test('10', () => {
            assert.equal(topic.f(10).hex(), '#a50026');
        });
        test('mid gray', () => {
            assert.equal(topic.f(50).hex(), '#ffffbf');
        });
        test('ends black', () => {
            assert.equal(topic.f(100).hex(), '#006837');
        });
        test('get colors', () => {
            assert.deepEqual(topic.f.colors(5), [
                '#a50026',
                '#f98e52',
                '#ffffbf',
                '#86cb67',
                '#006837'
            ]);
        });
    });

    describe('calling domain with no arguments', () => {
        const topic = {
            f: scale('RdYlGn').domain([0, 100]).classes(5)
        };
        test('returns domain', () => {
            assert.deepEqual(topic.f.domain(), [0, 100]);
        });
        test('returns classes', () => {
            assert.deepEqual(topic.f.classes(), [0, 20, 40, 60, 80, 100]);
        });
    });

    describe('source array keeps untouched', () => {
        const colors = chroma.brewer.Blues.slice(0);
        test('colors are an array', () => {
            assert.equal(colors.length, 9);
        });
        test('colors are strings', () => {
            assert.equal(typeof colors[0], 'string');
        });
        test('creating a color scale', () => {
            scale(colors);
            assert(true);
        });
        test('colors are still strings', () => {
            assert.equal(typeof colors[0], 'string');
        });
    });

    describe('domain with same min and max', () => {
        const topic = {
            f: scale(['white', 'black']).domain([1, 1])
        };
        test('returns color', () => {
            assert.deepEqual(topic.f(1).hex(), '#000000');
        });
    });

    describe('simple num scale (white-->black)', () => {
        const topic = {
            f: scale(['white', 'black']).mode('num')
        };
        test('starts white', () => {
            assert.equal(topic.f(0).hex(), '#ffffff');
        });
        test('25%', () => {
            assert.equal(topic.f(0.25).hex(), '#bfffff');
        });
        test('50%', () => {
            assert.equal(topic.f(0.5).hex(), '#7fffff');
        });
        test('75%', () => {
            assert.equal(topic.f(0.75).hex(), '#3fffff');
        });
        test('95%', () => {
            assert.equal(topic.f(0.95).hex(), '#0ccccc');
        });
        test('ends black', () => {
            assert.equal(topic.f(1).hex(), '#000000');
        });
    });

    describe('css rgb colors', () => {
        const topic = scale('YlGnBu')(0.3).css();
        test('have rounded rgb() values', () => {
            assert.equal(topic, 'rgb(170,222,183)');
        });
    });

    describe('css rgba colors', () => {
        const topic = scale('YlGnBu')(0.3).alpha(0.675).css();
        test('dont round alpha value', () => {
            assert.equal(topic, 'rgba(170,222,183,0.675)');
        });
    });

    describe('get colors from a scale', () => {
        const topic = {
            f: scale(['yellow', 'darkgreen'])
        };
        test('just colors', () => {
            assert.deepEqual(topic.f.colors(), ['#ffff00', '#006400']);
        });
        test('five hex colors', () => {
            assert.deepEqual(topic.f.colors(5), [
                '#ffff00',
                '#bfd800',
                '#80b200',
                '#408b00',
                '#006400'
            ]);
        });
        test('three css colors', () => {
            assert.deepEqual(topic.f.colors(3, 'css'), [
                'rgb(255,255,0)',
                'rgb(128,178,0)',
                'rgb(0,100,0)'
            ]);
        });
    });

    describe('get colors from a scale with more than two colors', () => {
        const topic = {
            f: scale(['yellow', 'orange', 'darkgreen'])
        };
        test('just origianl colors', () => {
            assert.deepEqual(topic.f.colors(), ['#ffff00', '#ffa500', '#006400']);
        });
    });

    describe('test example in readme', () => {
        const topic = {
            f: scale('RdYlGn')
        };
        test('five hex colors (new)', () => {
            assert.deepEqual(topic.f.colors(5), [
                '#a50026',
                '#f98e52',
                '#ffffbf',
                '#86cb67',
                '#006837'
            ]);
        });
    });

    describe('weird result', () => {
        const topic = {
            f: scale([
                [0, 0, 0, 1],
                [255, 255, 255, 1]
            ])
                .domain([0, 10])
                .mode('rgb')
        };
        test('has hex function at 0.5', () => {
            assert.equal(typeof topic.f(0.5).hex, 'function');
        });
        test('has hex function at 0', () => {
            assert.equal(typeof topic.f(0).hex, 'function');
        });
    });

    describe('scale padding, simple', () => {
        const topic = {
            f: scale('RdYlBu').padding(0.15)
        };
        test('0', () => {
            assert.equal(topic.f(0).hex(), '#e64f35');
        });
        test('0.5', () => {
            assert.equal(topic.f(0.5).hex(), '#ffffbf');
        });
        test('1', () => {
            assert.equal(topic.f(1).hex(), '#5d91c3');
        });
    });

    describe('scale padding, one-sided', () => {
        const topic = {
            f: scale('OrRd').padding([0.2, 0])
        };
        test('0', () => {
            assert.equal(topic.f(0).hex(), '#fddcaf');
        });
        test('0.5', () => {
            assert.equal(topic.f(0.5).hex(), '#f26d4b');
        });
        test('1', () => {
            assert.equal(topic.f(1).hex(), '#7f0000');
        });
    });

    describe('colors return original colors', () => {
        const topic = {
            f: scale(['red', 'white', 'blue'])
        };
        test('same colors', () => {
            assert.deepEqual(topic.f.colors(), ['#ff0000', '#ffffff', '#0000ff']);
        });
    });

    describe('scale with one color', () => {
        const topic = {
            f: scale(['red'])
        };
        test('should return that color', () => {
            assert.equal(topic.f(0.3).hex(), '#ff0000');
        });
    });

    describe('scale() no data color', () => {
        const topic = {
            f: scale('OrRd')
        };
        test('null --> nodata', () => {
            assert.equal(topic.f(null).hex(), '#cccccc');
        });
        test('undefined --> nodata', () => {
            assert.equal(topic.f(undefined).hex(), '#cccccc');
        });
        test('custom nodata color', () => {
            assert.equal(topic.f.nodata('#eee')(undefined).hex(), '#eeeeee');
        });
    });

    describe('scale wrapped in a scale', () => {
        const topic = {
            f1: scale('OrRd'),
            f: scale('OrRd').domain([0, 0.25, 1])
        };
        test('start', () => {
            assert.equal(topic.f(0).hex(), topic.f1(0).hex());
        });
        test('end', () => {
            assert.equal(topic.f(1).hex(), topic.f1(1).hex());
        });
        test('center', () => {
            assert.equal(topic.f(0.125).hex(), topic.f1(0.25).hex());
        });
        test('center2', () => {
            assert.equal(topic.f(0.25).hex(), topic.f1(0.5).hex());
        });
        test('center3', () => {
            assert.equal(topic.f(0.625).hex(), topic.f1(0.75).hex());
        });
    });
});
