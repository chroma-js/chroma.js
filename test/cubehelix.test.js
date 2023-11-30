import assert from 'assert';
import cubehelix from '../src/generator/cubehelix.js';

describe('Testing cubehelix scales', () => {
    describe('default helix', () => {
        function topic() {
            return cubehelix();
        }
        test('starts in black', () => {
            assert.equal(topic(0).hex(), '#000000');
        });
        test('at 0.25', () => {
            assert.equal(topic(0.25).hex(), '#16534c');
        });
        test('at 0.5', () => {
            assert.equal(topic(0.5).hex(), '#a07949');
        });
        test('at 0.75', () => {
            assert.equal(topic(0.75).hex(), '#c7b3ed');
        });
        test('ends in white', () => {
            assert.equal(topic(1).hex(), '#ffffff');
        });
    });

    describe('red helix', () => {
        function topic() {
            return cubehelix(0, 1, 1, 1);
        }
        test('starts in black', () => {
            assert.equal(topic(0).hex(), '#000000');
        });
        test('at 0.25', () => {
            assert.equal(topic(0.25).hex(), '#2e5117');
        });
        test('at 0.5', () => {
            assert.equal(topic(0.5).hex(), '#4c949f');
        });
        test('at 0.75', () => {
            assert.equal(topic(0.75).hex(), '#d1aee8');
        });
        test('ends in white', () => {
            assert.equal(topic(1).hex(), '#ffffff');
        });
    });

    describe('red helix - partial l range', () => {
        function topic() {
            return cubehelix(0, 1, 1, 1, [0.25, 0.75]);
        }
        test(starts, () => {
            assert.equal(topic(0).hex(), '#663028');
        });
        test('at 0.25', () => {
            assert.equal(topic(0.25).hex(), '#49752d');
        });
        test('at 0.5', () => {
            assert.equal(topic(0.5).hex(), '#4c949f');
        });
        test('at 0.75', () => {
            assert.equal(topic(0.75).hex(), '#b68ad2');
        });
        test(ends, () => {
            assert.equal(topic(1).hex(), '#e6b0a8');
        });
    });

    describe('red helix - gamma', () => {
        function topic() {
            return cubehelix(0, 1, 1, 0.8, [0, 1]);
        }
        test('starts in black', () => {
            assert.equal(topic(0).hex(), '#000000');
        });
        test('at 0.25', () => {
            assert.equal(topic(0.25).hex(), '#3f6824');
        });
        test('at 0.5', () => {
            assert.equal(topic(0.5).hex(), '#60a6b1');
        });
        test('at 0.75', () => {
            assert.equal(topic(0.75).hex(), '#dabcee');
        });
        test('ends in white', () => {
            assert.equal(topic(1).hex(), '#ffffff');
        });
    });

    describe('red helix - no saturation', () => {
        function topic() {
            return cubehelix(0, 1, 0, 1, [0, 1]);
        }
        test('starts in black', () => {
            assert.equal(topic(0).hex(), '#000000');
        });
        test('at 0.25', () => {
            assert.equal(topic(0.25).hex(), '#404040');
        });
        test('at 0.5', () => {
            assert.equal(topic(0.5).hex(), '#808080');
        });
        test('at 0.75', () => {
            assert.equal(topic(0.75).hex(), '#bfbfbf');
        });
        test('ends in white', () => {
            assert.equal(topic(1).hex(), '#ffffff');
        });
    });

    describe('red helix - saturation range', () => {
        function topic() {
            return cubehelix(0, 1, [1, 0], 1, [0, 1]);
        }
        test('starts in black', () => {
            assert.equal(topic(0).hex(), '#000000');
        });
        test('at 0.25', () => {
            assert.equal(topic(0.25).hex(), '#324c21');
        });
        test('at 0.5', () => {
            assert.equal(topic(0.5).hex(), '#668a8f');
        });
        test('at 0.75', () => {
            assert.equal(topic(0.75).hex(), '#c4bbc9');
        });
        test('ends in white', () => {
            assert.equal(topic(1).hex(), '#ffffff');
        });
        test('saturation decreases', () => {
            assert(topic(0.33).hsl()[1] > topic(0.66).hsl()[1]);
        });
    });

    describe('non-array lightness', () => {
        function topic() {
            return cubehelix(300, -1.5, 1, 1, 0.5);
        }
        test(start, () => {
            assert.equal(topic(0).hex(), '#ae629f');
        });
        test('at 0.5', () => {
            assert.equal(topic(0.5).hex(), '#a07949');
        });
        test(end, () => {
            assert.equal(topic(1).hex(), '#519d60');
        });
    });
});
