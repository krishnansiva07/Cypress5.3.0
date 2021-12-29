"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ampersandRe = /&/g;
var percentRe = /%/g;
var questionRe = /\?/g;
var plusRe = /\+/g;
function escapeFilenameInUrl(url) {
    // escape valid file name characters that cannot be used in URL
    return url
        .replace(percentRe, '%25') // %
        .replace(ampersandRe, '%26') // &
        .replace(questionRe, '%3F') // ? -> it's only valid in Linux
        .replace(plusRe, '%2B'); // + https://github.com/cypress-io/cypress/issues/5909
}
exports.escapeFilenameInUrl = escapeFilenameInUrl;
