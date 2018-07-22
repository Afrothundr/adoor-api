'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var _types = require('./types');

var _types2 = _interopRequireDefault(_types);

var _buyer = require('../../../models/buyer/buyer.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Buyer) {
    return {
        buyer: {
            type: _types2.default,
            args: {
                id: {
                    descriptiopn: 'ID of buyer',
                    type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
                }
            },
            resolve: function resolve(args) {
                return (0, _buyer.findById)(args.id);
            }
        },
        buyers: {
            type: new _graphql.GraphQLList(_types2.default),
            resolve: function resolve() {
                return (0, _buyer.find)({});
            }
        }
    };
};