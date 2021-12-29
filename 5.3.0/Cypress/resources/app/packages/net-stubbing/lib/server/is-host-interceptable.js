"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var minimatch_1 = __importDefault(require("minimatch"));
/**
 * Returns `true` if there is any chance that a request for `host` could match a route defined in `state`.
 * @param host `hostname:port`
 */
function isHostInterceptable(host, _a) {
    var routes = _a.routes;
    var _b = host.split(':'), hostname = _b[0], portStr = _b[1];
    var port = Number(portStr);
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var routeMatcher = routes_1[_i].routeMatcher;
        if (routeMatcher.port) {
            if (Array.isArray(routeMatcher.port) && !routeMatcher.port.includes(port)) {
                continue; // excluded by port list mismatch
            }
            if (!Array.isArray(routeMatcher.port) && routeMatcher.port !== port) {
                continue; // excluded by port mismatch
            }
        }
        if (!routeMatcher.hostname && !routeMatcher.url) {
            return true; // route has no constraints on host, could match
        }
        if (routeMatcher.hostname) {
            if (routeMatcher.hostname instanceof RegExp && routeMatcher.hostname.test(hostname)) {
                return true; // hostname RegExp is a match
            }
            if (routeMatcher.hostname === hostname) {
                return true; // hostname is an exact match
            }
        }
        if (routeMatcher.url) {
            if (routeMatcher.url instanceof RegExp) {
                return true; // possible that the RegExp could match a URL
            }
            if (host.includes(routeMatcher.url)) {
                return true; // possible for substring to match
            }
            try {
                var url = new url_1.URL(routeMatcher.url);
                if (minimatch_1.default(host, url.host) || minimatch_1.default(hostname, url.hostname)) {
                    return true; // host could match
                }
            }
            catch (e) {
                return true; // invalid URL, so partial URL, could possibly match
            }
        }
    }
    return false; // ruled out all possibilities for a match
}
exports.isHostInterceptable = isHostInterceptable;
