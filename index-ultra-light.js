import {chroma} from './src/chroma.js';

// feel free to comment out anything to rollup
// a smaller chroma.js build

// io --> convert colors
import './src/io/css/index.js';
import './src/io/hex/index.js';
import './src/io/rgb/index.js';
import './src/io/and/index.js';

// operators --> modify existing Colors
import './src/ops/get.js';

// other utility methods

import valid from './src/utils/valid.js';
chroma.valid = valid;

export default chroma;