import assert from 'assert';
import css2rgb from '../src/io/css/css2rgb.js';

// const round = (digits) => {
//     const d = Math.pow(10,digits);
//     return (v) => Math.round(v*d) / d;
// }

describe('Testing CSS2RGB color conversions', () => {
    describe('parse CSS colors', () => {
        const topic = {
            'rgb(0,0,0)': [0, 0, 0, 1],
            'rgb(100%,100%,100%)': [255, 255, 255, 1],
            'foobarrgb(100%,100%,100%)': undefined,
            'rgba(255,0,0,0.5)': [255, 0, 0, 0.5],
            'RGBA(255, 0, 0  , 0.5)': [255, 0, 0, 0.5],
            'RGBA (255, 0, 0  , 0.5)': undefined,
            'rgba(0%,100%,0%,.5)': [0, 255, 0, 0.5],
            ' hsl(240,100%,50%) ': [0, 0, 255, 1],
            'hsl(60,100%,50%)': [255, 255, 0, 1],
            'hsla(180,100%,50%,1)': [0, 255, 255, 1],
            'hsla(300,100%,50%,.25)': [255, 0, 255, 0.25],
            blanchedalmond: [255, 235, 205, 1],
            blue: [0, 0, 255, 1],
            BlueViolet: [138, 43, 226, 1],
            BROWN: [165, 42, 42, 1],
            unknownColor: undefined
        };
        test('parse', () => {
            Object.keys(topic).forEach(name => assert.deepStrictEqual(css2rgb(name), topic[name]));
        });
    });
});
