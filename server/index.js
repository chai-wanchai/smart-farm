"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var express_1 = require("express");
var handle = app_1["default"].getRequestHandler();
var port = parseInt(process.env.PORT || '5000', 10);
var renderPage = function (req, res, pagePath, queryParams) { return app_1["default"]
    .render(req, res, pagePath, queryParams)["catch"](function (err) { return app_1["default"].renderError(err, req, res, pagePath, queryParams); }); };
app_1["default"].prepare().then(function () {
    // Create express server
    var server = express_1["default"]();
    server.all('*', function (req, res) { return handle(req, res); });
    server.listen(port, function (err) {
        if (err)
            throw err;
        console.log("> Ready on http://localhost:" + port);
    });
});
