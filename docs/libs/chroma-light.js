/**
 * chroma.js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2019, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * -------------------------------------------------------
 *
 * chroma.js includes colors from colorbrewer2.org, which are released under
 * the following license:
 *
 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
 * and The Pennsylvania State University.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * ------------------------------------------------------
 *
 * Named colors are taken from X11 Color Names.
 * http://www.w3.org/TR/css3-color/#svg-color
 *
 * @preserve
 */

var limit = (x, min=0, max=1) => {
    return x < min ? min : x > max ? max : x;
};

var clip_rgb = (rgb) => {
    rgb._clipped = false;
    rgb._unclipped = rgb.slice(0);
    for (let i=0; i<=3; i++) {
        if (i < 3) {
            if (rgb[i] < 0 || rgb[i] > 255) rgb._clipped = true;
            rgb[i] = limit(rgb[i], 0, 255);
        } else if (i === 3) {
            rgb[i] = limit(rgb[i], 0, 1);
        }
    }
    return rgb;
};

// ported from jQuery's $.type
const classToType = {};
for (let name of ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null']) {
    classToType[`[object ${name}]`] = name.toLowerCase();
}
function type(obj) {
    return classToType[Object.prototype.toString.call(obj)] || "object";
}

var unpack = (args, keyOrder=null) => {
	// if called with more than 3 arguments, we return the arguments
    if (args.length >= 3) return Array.prototype.slice.call(args);
    // with less than 3 args we check if first arg is object
    // and use the keyOrder string to extract and sort properties
	if (type(args[0]) == 'object' && keyOrder) {
		return keyOrder.split('')
			.filter(k => args[0][k] !== undefined)
			.map(k => args[0][k]);
	}
	// otherwise we just return the first argument
	// (which we suppose is an array of args)
    return args[0];
};

var last = (args) => {
    if (args.length < 2) return null;
    const l = args.length-1;
    if (type(args[l]) == 'string') return args[l].toLowerCase();
    return null;
};

var input = {
	format: {},
	autodetect: []
};

class Color {

    constructor(...args) {
        const me = this;
        if (type(args[0]) === 'object' &&
            args[0].constructor &&
            args[0].constructor === this.constructor) {
            // the argument is already a Color instance
            return args[0];
        }

        // last argument could be the mode
        let mode = last(args);
        let autodetect = false;

        if (!mode) {
            autodetect = true;
            if (!input.sorted) {
                input.autodetect = input.autodetect.sort((a,b) => b.p - a.p);
                input.sorted = true;
            }
            // auto-detect format
            for (let chk of input.autodetect) {
                mode = chk.test(...args);
                if (mode) break;
            }
        }
        if (input.format[mode]) {
            const rgb = input.format[mode].apply(null, autodetect ? args : args.slice(0,-1));
            me._rgb = clip_rgb(rgb);
        } else {
            throw new Error('unknown format: '+args);
        }

        // add alpha channel
        if (me._rgb.length === 3) me._rgb.push(1);
    }

    toString() {
        if (type(this.hex) == 'function') return this.hex();
        return `[${this._rgb.join(',')}]`;
    }

}

const chroma = (...args) => {
	return new chroma.Color(...args);
};

chroma.Color = Color;
chroma.version = '2.6.2';

const rnd = (a) => Math.round(a*100)/100;

/*
 * supported arguments:
 * - hsl2css(h,s,l)
 * - hsl2css(h,s,l,a)
 * - hsl2css([h,s,l], mode)
 * - hsl2css([h,s,l,a], mode)
 * - hsl2css({h,s,l,a}, mode)
 */
const hsl2css = (...args) => {
    const hsla = unpack(args, 'hsla');
    let mode = last(args) || 'lsa';
    hsla[0] = rnd(hsla[0] || 0);
    hsla[1] = rnd(hsla[1]*100) + '%';
    hsla[2] = rnd(hsla[2]*100) + '%';
    if (mode === 'hsla' || (hsla.length > 3 && hsla[3]<1)) {
        hsla[3] = hsla.length > 3 ? hsla[3] : 1;
        mode = 'hsla';
    } else {
        hsla.length = 3;
    }
    return `${mode}(${hsla.join(',')})`;
};

/*
 * supported arguments:
 * - rgb2hsl(r,g,b)
 * - rgb2hsl(r,g,b,a)
 * - rgb2hsl([r,g,b])
 * - rgb2hsl([r,g,b,a])
 * - rgb2hsl({r,g,b,a})
 */
const rgb2hsl = (...args) => {
    args = unpack(args, 'rgba');
    let [r,g,b] = args;

    r /= 255;
    g /= 255;
    b /= 255;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    const l = (max + min) / 2;
    let s, h;

    if (max === min){
        s = 0;
        h = Number.NaN;
    } else {
        s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
    }

    if (r == max) h = (g - b) / (max - min);
    else if (g == max) h = 2 + (b - r) / (max - min);
    else if (b == max) h = 4 + (r - g) / (max - min);

    h *= 60;
    if (h < 0) h += 360;
    if (args.length>3 && args[3]!==undefined) return [h,s,l,args[3]];
    return [h,s,l];
};

const { round: round$5 } = Math;

/*
 * supported arguments:
 * - rgb2css(r,g,b)
 * - rgb2css(r,g,b,a)
 * - rgb2css([r,g,b], mode)
 * - rgb2css([r,g,b,a], mode)
 * - rgb2css({r,g,b,a}, mode)
 */
const rgb2css = (...args) => {
    const rgba = unpack(args, 'rgba');
    let mode = last(args) || 'rgb';
    if (mode.substr(0,3) == 'hsl') {
        return hsl2css(rgb2hsl(rgba), mode);
    }
    rgba[0] = round$5(rgba[0]);
    rgba[1] = round$5(rgba[1]);
    rgba[2] = round$5(rgba[2]);
    if (mode === 'rgba' || (rgba.length > 3 && rgba[3]<1)) {
        rgba[3] = rgba.length > 3 ? rgba[3] : 1;
        mode = 'rgba';
    }
    return `${mode}(${rgba.slice(0,mode==='rgb'?3:4).join(',')})`;
};

const { round: round$4 } = Math;

const hsl2rgb = (...args) => {
    args = unpack(args, 'hsl');
    const [h,s,l] = args;
    let r,g,b;
    if (s === 0) {
        r = g = b = l*255;
    } else {
        const t3 = [0,0,0];
        const c = [0,0,0];
        const t2 = l < 0.5 ? l * (1+s) : l+s-l*s;
        const t1 = 2 * l - t2;
        const h_ = h / 360;
        t3[0] = h_ + 1/3;
        t3[1] = h_;
        t3[2] = h_ - 1/3;
        for (let i=0; i<3; i++) {
            if (t3[i] < 0) t3[i] += 1;
            if (t3[i] > 1) t3[i] -= 1;
            if (6 * t3[i] < 1)
                c[i] = t1 + (t2 - t1) * 6 * t3[i];
            else if (2 * t3[i] < 1)
                c[i] = t2;
            else if (3 * t3[i] < 2)
                c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6;
            else
                c[i] = t1;
        }
        [r,g,b] = [round$4(c[0]*255),round$4(c[1]*255),round$4(c[2]*255)];
    }
    if (args.length > 3) {
        // keep alpha channel
        return [r,g,b,args[3]];
    }
    return [r,g,b,1];
};

const RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
const RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
const RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
const RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
const RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
const RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;

const { round: round$3 } = Math;

const css2rgb = (css) => {
    css = css.toLowerCase().trim();
    let m;

    if (input.format.named) {
        try {
            return input.format.named(css);
        } catch (e) {
            // eslint-disable-next-line
        }
    }

    // rgb(250,20,0)
    if ((m = css.match(RE_RGB))) {
        const rgb = m.slice(1,4);
        for (let i=0; i<3; i++) {
            rgb[i] = +rgb[i];
        }
        rgb[3] = 1;  // default alpha
        return rgb;
    }

    // rgba(250,20,0,0.4)
    if ((m = css.match(RE_RGBA))) {
        const rgb = m.slice(1,5);
        for (let i=0; i<4; i++) {
            rgb[i] = +rgb[i];
        }
        return rgb;
    }

    // rgb(100%,0%,0%)
    if ((m = css.match(RE_RGB_PCT))) {
        const rgb = m.slice(1,4);
        for (let i=0; i<3; i++) {
            rgb[i] = round$3(rgb[i] * 2.55);
        }
        rgb[3] = 1;  // default alpha
        return rgb;
    }

    // rgba(100%,0%,0%,0.4)
    if ((m = css.match(RE_RGBA_PCT))) {
        const rgb = m.slice(1,5);
        for (let i=0; i<3; i++) {
            rgb[i] = round$3(rgb[i] * 2.55);
        }
        rgb[3] = +rgb[3];
        return rgb;
    }

    // hsl(0,100%,50%)
    if ((m = css.match(RE_HSL))) {
        const hsl = m.slice(1,4);
        hsl[1] *= 0.01;
        hsl[2] *= 0.01;
        const rgb = hsl2rgb(hsl);
        rgb[3] = 1;
        return rgb;
    }

    // hsla(0,100%,50%,0.5)
    if ((m = css.match(RE_HSLA))) {
        const hsl = m.slice(1,4);
        hsl[1] *= 0.01;
        hsl[2] *= 0.01;
        const rgb = hsl2rgb(hsl);
        rgb[3] = +m[4];  // default alpha = 1
        return rgb;
    }
};

css2rgb.test = (s) => {
    return RE_RGB.test(s) ||
        RE_RGBA.test(s) ||
        RE_RGB_PCT.test(s) ||
        RE_RGBA_PCT.test(s) ||
        RE_HSL.test(s) ||
        RE_HSLA.test(s);
};

Color.prototype.css = function(mode) {
    return rgb2css(this._rgb, mode);
};

chroma.css = (...args) => new Color(...args, 'css');

input.format.css = css2rgb;

input.autodetect.push({
    p: 5,
    test: (h, ...rest) => {
        if (!rest.length && type(h) === 'string' && css2rgb.test(h)) {
            return 'css';
        }
    }
});

const { round: round$2 } = Math;

const rgb2hex = (...args) => {
    let [r,g,b,a] = unpack(args, 'rgba');
    let mode = last(args) || 'auto';
    if (a === undefined) a = 1;
    if (mode === 'auto') {
        mode = a < 1 ? 'rgba' : 'rgb';
    }
    r = round$2(r);
    g = round$2(g);
    b = round$2(b);
    const u = r << 16 | g << 8 | b;
    let str = "000000" + u.toString(16); //#.toUpperCase();
    str = str.substr(str.length - 6);
    let hxa = '0' + round$2(a * 255).toString(16);
    hxa = hxa.substr(hxa.length - 2);
    switch (mode.toLowerCase()) {
        case 'rgba': return `#${str}${hxa}`;
        case 'argb': return `#${hxa}${str}`;
        default: return `#${str}`;
    }
};

const RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

const hex2rgb = (hex) => {
    if (hex.match(RE_HEX)) {
        // remove optional leading #
        if (hex.length === 4 || hex.length === 7) {
            hex = hex.substr(1);
        }
        // expand short-notation to full six-digit
        if (hex.length === 3) {
            hex = hex.split('');
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        const u = parseInt(hex, 16);
        const r = u >> 16;
        const g = u >> 8 & 0xFF;
        const b = u & 0xFF;
        return [r,g,b,1];
    }

    // match rgba hex format, eg #FF000077
    if (hex.match(RE_HEXA)) {
        if (hex.length === 5 || hex.length === 9) {
            // remove optional leading #
            hex = hex.substr(1);
        }
        // expand short-notation to full eight-digit
        if (hex.length === 4) {
            hex = hex.split('');
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
        }
        const u = parseInt(hex, 16);
        const r = u >> 24 & 0xFF;
        const g = u >> 16 & 0xFF;
        const b = u >> 8 & 0xFF;
        const a = Math.round((u & 0xFF) / 0xFF * 100) / 100;
        return [r,g,b,a];
    }

    // we used to check for css colors here
    // if _input.css? and rgb = _input.css hex
    //     return rgb

    throw new Error(`unknown hex color: ${hex}`);
};

Color.prototype.hex = function(mode) {
    return rgb2hex(this._rgb, mode);
};

chroma.hex = (...args) => new Color(...args, 'hex');

input.format.hex = hex2rgb;
input.autodetect.push({
    p: 4,
    test: (h, ...rest) => {
        if (!rest.length && type(h) === 'string' && [3,4,5,6,7,8,9].indexOf(h.length) >= 0) {
            return 'hex';
        }
    }
});

Color.prototype.hsl = function() {
    return rgb2hsl(this._rgb);
};

chroma.hsl = (...args) => new Color(...args, 'hsl');

input.format.hsl = hsl2rgb;

input.autodetect.push({
    p: 2,
    test: (...args) => {
        args = unpack(args, 'hsl');
        if (type(args) === 'array' && args.length === 3) {
            return 'hsl';
        }
    }
});

const Kn = 18;

// D65 standard referent
const Xn = 0.950470;
const Yn = 1;
const Zn = 1.088830;

const t0 = 0.137931034;  // 4 / 29
const t1 = 0.206896552;  // 6 / 29
const t2 = 0.12841855;   // 3 * t1 * t1
const t3 = 0.008856452;  // t1 * t1 * t1

var LAB_CONSTANTS = {
    // Corresponds roughly to RGB brighter/darker
    Kn,

    // D65 standard referent
    Xn,
    Yn,
    Zn,

    t0,  // 4 / 29
    t1,  // 6 / 29
    t2,   // 3 * t1 * t1
    t3,  // t1 * t1 * t1
};

const { pow: pow$4 } = Math;

const rgb2lab = (...args) => {
    const [r,g,b] = unpack(args, 'rgb');
    const [x,y,z] = rgb2xyz(r,g,b);
    const l = 116 * y - 16;
    return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
};

const rgb_xyz = (r) => {
    if ((r /= 255) <= 0.04045) return r / 12.92;
    return pow$4((r + 0.055) / 1.055, 2.4);
};

const xyz_lab = (t) => {
    if (t > LAB_CONSTANTS.t3) return pow$4(t, 1 / 3);
    return t / LAB_CONSTANTS.t2 + LAB_CONSTANTS.t0;
};

const rgb2xyz = (r,g,b) => {
    r = rgb_xyz(r);
    g = rgb_xyz(g);
    b = rgb_xyz(b);
    const x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS.Xn);
    const y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / LAB_CONSTANTS.Yn);
    const z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / LAB_CONSTANTS.Zn);
    return [x,y,z];
};

const { pow: pow$3 } = Math;

/*
 * L* [0..100]
 * a [-100..100]
 * b [-100..100]
 */
const lab2rgb = (...args) => {
    args = unpack(args, 'lab');
    const [l,a,b] = args;
    let x,y,z, r,g,b_;

    y = (l + 16) / 116;
    x = isNaN(a) ? y : y + a / 500;
    z = isNaN(b) ? y : y - b / 200;

    y = LAB_CONSTANTS.Yn * lab_xyz(y);
    x = LAB_CONSTANTS.Xn * lab_xyz(x);
    z = LAB_CONSTANTS.Zn * lab_xyz(z);

    r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);  // D65 -> sRGB
    g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
    b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);

    return [r,g,b_,args.length > 3 ? args[3] : 1];
};

const xyz_rgb = (r) => {
    return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow$3(r, 1 / 2.4) - 0.055)
};

const lab_xyz = (t) => {
    return t > LAB_CONSTANTS.t1 ? t * t * t : LAB_CONSTANTS.t2 * (t - LAB_CONSTANTS.t0)
};

Color.prototype.lab = function() {
    return rgb2lab(this._rgb);
};

chroma.lab = (...args) => new Color(...args, 'lab');

input.format.lab = lab2rgb;

input.autodetect.push({
    p: 2,
    test: (...args) => {
        args = unpack(args, 'lab');
        if (type(args) === 'array' && args.length === 3) {
            return 'lab';
        }
    }
});

const { cbrt, pow: pow$2, sign: sign$1 } = Math;

const rgb2oklab = (...args) => {
    // OKLab color space implementation taken from
    // https://bottosson.github.io/posts/oklab/
    const [r, g, b] = unpack(args, 'rgb');
    const [lr, lg, lb] = [rgb2lrgb(r / 255), rgb2lrgb(g / 255), rgb2lrgb(b / 255)];
    const l = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const m = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

    return [
        0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
        1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
        0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
    ];
};

function rgb2lrgb(c) {
    const abs = Math.abs(c);
    if (abs < 0.04045) {
        return c / 12.92;
    }
    return (sign$1(c) || 1) * pow$2((abs + 0.055) / 1.055, 2.4);
}

const { pow: pow$1, sign } = Math;

/*
 * L* [0..100]
 * a [-100..100]
 * b [-100..100]
 */
const oklab2rgb = (...args) => {
    args = unpack(args, 'lab');
    const [L, a, b] = args;

    const l = pow$1(L + 0.3963377774 * a + 0.2158037573 * b, 3);
    const m = pow$1(L - 0.1055613458 * a - 0.0638541728 * b, 3);
    const s = pow$1(L - 0.0894841775 * a - 1.291485548 * b, 3);

    return [
        255 * lrgb2rgb(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
        255 * lrgb2rgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
        255 * lrgb2rgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
        args.length > 3 ? args[3] : 1
    ];
};

function lrgb2rgb(c) {
    const abs = Math.abs(c);
    if (abs > 0.0031308) {
        return (sign(c) || 1) * (1.055 * pow$1(abs, 1 / 2.4) - 0.055);
    }
    return c * 12.92;
}

Color.prototype.oklab = function () {
    return rgb2oklab(this._rgb);
};

chroma.oklab = (...args) => new Color(...args, 'oklab');

input.format.oklab = oklab2rgb;

input.autodetect.push({
    p: 3,
    test: (...args) => {
        args = unpack(args, 'oklab');
        if (type(args) === 'array' && args.length === 3) {
            return 'oklab';
        }
    }
});

const { round: round$1 } = Math;

Color.prototype.rgb = function(rnd=true) {
    if (rnd === false) return this._rgb.slice(0,3);
    return this._rgb.slice(0,3).map(round$1);
};

Color.prototype.rgba = function(rnd=true) {
    return this._rgb.slice(0,4).map((v,i) => {
        return i<3 ? (rnd === false ? v : round$1(v)) : v;
    });
};

chroma.rgb = (...args) => new Color(...args, 'rgb');

input.format.rgb = (...args) => {
    const rgba = unpack(args, 'rgba');
    if (rgba[3] === undefined) rgba[3] = 1;
    return rgba;
};

input.autodetect.push({
    p: 3,
    test: (...args) => {
        args = unpack(args, 'rgba');
        if (type(args) === 'array' && (args.length === 3 ||
            args.length === 4 && type(args[3]) == 'number' && args[3] >= 0 && args[3] <= 1)) {
            return 'rgb';
        }
    }
});

const {round} = Math;

const rgb2and = (...args) => {
    const rgba = unpack(args, 'rgba');
    let mode = (rgba[3] !== 1 ? last(args) : 'rgb') || 'rgb';
    rgba[0] = round(rgba[0]);
    rgba[1] = round(rgba[1]);
    rgba[2] = round(rgba[2]);
    if (mode === 'rgba' || (rgba.length > 3 && rgba[3] < 1 && last(args) !== 'rgb')) {
        rgba[3] = rgba.length > 3 ? rgba[3] : 1;
        mode = 'rgba';
    }
    return 	mode === 'rgba' 
		? ((rgba[3] << 24) | (rgba[0] << 16) | (rgba[1] << 8) | (rgba[2])) 
		: (0xff000000 | (rgba[0] << 16) | (rgba[1] << 8) | (rgba[2]));
};

const and2rgb = (and) => {
    if (type(and) == "number") {
        const alpha = (and >> 24 & 0xFF) / 255;
        if (alpha >= 0 && alpha <= 1) {
			const a = and - 0xFF000000;
            const r = a >> 16 & 0xFF;
            const g = (a >> 8) & 0xFF;
            const b = a & 0xFF;
            return [r,g,b,alpha];
        }
    }
    throw new Error("unknown android color: "+and);
};

Color.prototype.android = function(mode) {
    return rgb2and(this._rgb, mode);
};

chroma.android = (...args) => new Color(...args, 'android');
input.format.android = and2rgb;

input.autodetect.push({
    p: 5,
    test: (...args) => {
        if (args.length === 1 && type(args[0]) === 'number') {
            const alpha = (args[0] >> 24 & 0xFF) / 255;
            if (alpha >= 0 && alpha <= 1) {
                const a = args[0] - 0xFF000000;
                const r = a >> 16 & 0xFF;
                const g = (a >> 8) & 0xFF;
                const b = a & 0xFF;
                if ([r,g,b].every((val) => val >= 0 && val <= 255)) {
                    return 'android';
                }
            }
        }
    }
});

Color.prototype.alpha = function(a, mutate=false) {
    if (a !== undefined && type(a) === 'number') {
        if (mutate) {
            this._rgb[3] = a;
            return this;
        }
        return new Color([this._rgb[0], this._rgb[1], this._rgb[2], a], 'rgb');
    }
    return this._rgb[3];
};

Color.prototype.darken = function(amount=1) {
	const me = this;
	const lab = me.lab();
	lab[0] -= LAB_CONSTANTS.Kn * amount;
	return new Color(lab, 'lab').alpha(me.alpha(), true);
};

Color.prototype.brighten = function(amount=1) {
	return this.darken(-amount);
};

Color.prototype.darker = Color.prototype.darken;
Color.prototype.brighter = Color.prototype.brighten;

Color.prototype.get = function (mc) {
    const [mode, channel] = mc.split('.');
    const src = this[mode]();
    if (channel) {
        const i = mode.indexOf(channel) - (mode.substr(0, 2) === 'ok' ? 2 : 0);
        if (i > -1) return src[i];
        throw new Error(`unknown channel ${channel} in mode ${mode}`);
    } else {
        return src;
    }
};

var index = {};

var mix = (col1, col2, f=0.5, ...rest) => {
    let mode = rest[0] || 'lrgb';
    if (!index[mode] && !rest.length) {
        // fall back to the first supported mode
        mode = Object.keys(index)[0];
    }
    if (!index[mode]) {
        throw new Error(`interpolation mode ${mode} is not defined`);
    }
    if (type(col1) !== 'object') col1 = new Color(col1);
    if (type(col2) !== 'object') col2 = new Color(col2);
    return index[mode](col1, col2, f)
        .alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
};

Color.prototype.mix =
Color.prototype.interpolate = function(col2, f=0.5, ...rest) {
	return mix(this, col2, f, ...rest);
};

Color.prototype.set = function (mc, value, mutate = false) {
    const [mode, channel] = mc.split('.');
    const src = this[mode]();
    if (channel) {
        const i = mode.indexOf(channel) - (mode.substr(0, 2) === 'ok' ? 2 : 0);
        if (i > -1) {
            if (type(value) == 'string') {
                switch (value.charAt(0)) {
                    case '+':
                        src[i] += +value;
                        break;
                    case '-':
                        src[i] += +value;
                        break;
                    case '*':
                        src[i] *= +value.substr(1);
                        break;
                    case '/':
                        src[i] /= +value.substr(1);
                        break;
                    default:
                        src[i] = +value;
                }
            } else if (type(value) === 'number') {
                src[i] = value;
            } else {
                throw new Error(`unsupported value for Color.set`);
            }
            const out = new Color(src, mode);
            if (mutate) {
                this._rgb = out._rgb;
                return this;
            }
            return out;
        }
        throw new Error(`unknown channel ${channel} in mode ${mode}`);
    } else {
        return src;
    }
};

const { sqrt, pow } = Math;

const lrgb = (col1, col2, f) => {
    const [x1,y1,z1] = col1._rgb;
    const [x2,y2,z2] = col2._rgb;
    return new Color(
        sqrt(pow(x1,2) * (1-f) + pow(x2,2) * f),
        sqrt(pow(y1,2) * (1-f) + pow(y2,2) * f),
        sqrt(pow(z1,2) * (1-f) + pow(z2,2) * f),
        'rgb'
    )
};

// register interpolator
index.lrgb = lrgb;

const oklab = (col1, col2, f) => {
    const xyz0 = col1.oklab();
    const xyz1 = col2.oklab();
    return new Color(
        xyz0[0] + f * (xyz1[0] - xyz0[0]),
        xyz0[1] + f * (xyz1[1] - xyz0[1]),
        xyz0[2] + f * (xyz1[2] - xyz0[2]),
        'oklab'
    );
};

// register interpolator
index.oklab = oklab;

var valid = (...args) => {
    try {
        new Color(...args);
        return true;
    } catch (e) {
        return false;
    }
};

// generators -- > create new colors
chroma.mix = chroma.interpolate = mix;

// other utility methods
chroma.valid = valid;

export { chroma as default };
