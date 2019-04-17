"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller for the graph.
 */
var GraphController = function () {
    function GraphController(app) {
        _classCallCheck(this, GraphController);

        this.app = app;
        this.query = this.query.bind(this);
    }

    /**
     * Query the graph
     * @param  {} query
     * @param  {} variables={}
     */


    _createClass(GraphController, [{
        key: "query",
        value: function query(_query) {
            var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return this.app.getAdaptor().query(_query, variables);
        }
    }]);

    return GraphController;
}();

module.exports = GraphController;