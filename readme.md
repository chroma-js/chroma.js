# Chroma.js

[Chroma.js](https://github.com/chroma-js/chroma.js) is a ~~tiny~~ [small-ish](https://bundlephobia.com/result?p=chroma-js) zero-dependency JavaScript library for all kinds of color conversions and color scales. **Forked with new features and maintained.**

[![Build Status](https://api.travis-ci.com/gka/chroma.js.svg?branch=master)](https://travis-ci.com/gka/chroma.js)

### Demo

<!-- CONTINUE update urls -->

- [luminance](https://code4fukui.github.io/chroma-es/test/html/luminance.html)
- [blend](https://code4fukui.github.io/chroma-es/test/html/blend.html)
- [bezier](https://code4fukui.github.io/chroma-es/test/html/bezier.html)
- [colorscales](https://code4fukui.github.io/chroma-es/test/html/colorscales.html)
- [cubehelix](https://code4fukui.github.io/chroma-es/test/html/cubehelix.html)

### Usage

In Deno:

```javascript
import chroma from "https://github.com/chroma-js/chroma.js/index.js"; // CONTINUE proper URL
```

In Node.js install from npm

```
npm install chroma-js
```

Import package into project

```javascript
import chroma from "chroma-js";
```

Initiate and manipulate colors:

```javascript
chroma('#D4F880').darken().hex();  // #a1c550
```

Working with color scales is easy, too:

```javascript
const scale = chroma.scale(['white', 'red']);
scale(0.5).hex(); // #FF7F7F
```

Lab/Lch interpolation looks better than RGB

```javascript
chroma.scale(['white', 'red']).mode('lab');
```

Custom domains! Quantiles! Color Brewer!!

```javascript
chroma.scale('RdYlBu').domain(myValues, 7, 'quantiles');
```

And why not use logarithmic color scales once in your life?

```javascript
chroma.scale(['lightyellow', 'navy']).domain([1, 100000], 7, 'log');
```

### Like it?

<!-- CONTINUE update URL -->
Why not dive into the [interactive documentation](https://regorxxx.github.io/chroma.js/) (there's a [static version](https://github.com/regorxxx/chroma.js/blob/master/docs/src/index.md), too). You can download [chroma.min.js](https://raw.github.com/regorxxx/chroma.js/master/chroma.min.js).

You can use it in node.js, too!

    npm install chroma-js

You can use it in SASS using [chromatic-sass](https://github.com/bugsnag/chromatic-sass)!

You can use it in Deno, too!

```javascript
import chroma from "https://github.com/chroma-js/chroma.js/index.js"; // CONTINUE proper URL
```

## Minify

```bash
npm install terser -g
sh make.sh
```

### Build instructions

First clone the repository and install the dev dependencies:

    git clone git@github.com:chroma-js/chroma.js.git
    cd chroma.js
    npm install

Then compile the coffee-script source files to the build files:

    npm run build

Don't forget to tests your changes! You will probably also want to add new test to the `/test` folder in case you added a feature.

    npm test

And to update the documentation just run

    npm run docs

To preview the docs locally you can use

    npm run docs-preview

### Similar Libraries / Prior Art

* [Original chroma.js](https://github.com/gka/chroma.js)
* [Chromatist](https://github.com/jrus/chromatist)
* [GrapeFruit](https://github.com/xav/Grapefruit) (Python)
* [colors.py](https://github.com/mattrobenolt/colors.py) (Python)
* [d3.js](https://github.com/mbostock/d3)


### Authors

Chroma.js is written by [these awesome contributors](https://github.com/chroma-js/chroma.js/graphs/contributors).

### License

Released under [BSD license](http://opensource.org/licenses/BSD-3-Clause).
Versions prior to 0.4 were released under [GPL](http://www.gnu.org/licenses/gpl-3.0).

### Further reading

* [How To Avoid Equidistant HSV Colors](https://vis4.net/blog/posts/avoid-equidistant-hsv-colors/)
* [Mastering Multi-hued Color Scales with Chroma.js](https://vis4.net/blog/posts/mastering-multi-hued-color-scales/)

### FAQ

**There have been no commits in X weeks. Is chroma.js dead?**

Yes! That's why it has been forked and now maintained here.
