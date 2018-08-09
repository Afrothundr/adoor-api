import { GraphQLList, GraphQLObjectType, GraphQLID } from 'graphql';

const Buyer = require('../../../models/buyer/buyer.model');

export const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        buyer: {
            type: require('./types').buyerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Buyer.findById(args.id);
            }
        },
        buyers: {
            type: new GraphQLList(require('./types').buyerType),
            resolve() {
                return Buyer.find({});
            }
        }
    })
});