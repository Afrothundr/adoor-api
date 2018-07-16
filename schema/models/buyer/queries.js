const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLList
} = require('graphql');

const buyerType = require('./types');
const BuyerModelType = require('../../../models/buyer/buyer.model');

module.exports = Buyer => ({
    buyer: {
        type: buyerType,
        args: {
            id: {
                descriptiopn: 'ID of buyer',
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(args) {
            return BuyerModelType.findById(args.id);
        }
    },
    buyers: {
        type: new GraphQLList(buyerType),
        resolve() {
            return BuyerModelType.find({});
        }
    }
})