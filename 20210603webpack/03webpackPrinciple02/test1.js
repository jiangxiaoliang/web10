(function(graph) {
    function require(module) {
        function localRequire(relativePath) {
            return require(graph[module].dependecies[relativePath])
        }
        var exports = {};
        (function(require, exports, code) {
            eval(code)
        })(localRequire, exports, graph[module].code)
        return exports;
    }
    require('./src/index.js')
})({"./src/index.js":{"dependecies":{"./a.js":"./src\\a.js"},"code":"\"use strict\";\n\nvar _a = _interopRequireDefault(require(\"./a.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log('hello ' + _a[\"default\"]);"},"./src\\a.js":{"dependecies":{"./b.js":"./src\\b.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _b = _interopRequireDefault(require(\"./b.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar a = 'world' + _b[\"default\"];\nvar _default = a;\nexports[\"default\"] = _default;"},"./src\\b.js":{"dependecies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar b = '!!!';\nvar _default = b;\nexports[\"default\"] = _default;"}})