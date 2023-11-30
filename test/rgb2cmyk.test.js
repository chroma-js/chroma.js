import assert from 'assert';

import rgb2cmyk from '../src/io/cmyk/rgb2cmyk.js';

describe('Testing CMYK color conversions', () => {
    describe('parse simple CMYK colors', () => {
        const topic = {
            black: { cmyk: [0, 0, 0, 1], rgb: [0, 0, 0, 1] },
            white: { cmyk: [0, 0, 0, 0], rgb: [255, 255, 255, 1] },
            red: { cmyk: [0, 1, 1, 0], rgb: [255, 0, 0, 1] },
            green: { cmyk: [1, 0, 1, 0], rgb: [0, 255, 0, 1] },
            blue: { cmyk: [1, 1, 0, 0], rgb: [0, 0, 255, 1] },
            yellow: { cmyk: [0, 0, 1, 0], rgb: [255, 255, 0, 1] },
            cyan: { cmyk: [1, 0, 0, 0], rgb: [0, 255, 255, 1] },
            magenta: { cmyk: [0, 1, 0, 0], rgb: [255, 0, 255, 1] }
        };
        test('rgb2cmyk', () => {
            Object.keys(topic).forEach(key => {
                assert.deepEqual(rgb2cmyk(topic[key].rgb), topic[key].cmyk);
            });
        });
    });
});
