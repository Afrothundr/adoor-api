import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { buyerInputType, buyerType } from "./models/buyer/types";

const Buyer = require('../models/buyer/buyer.model');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        buyer: {
            type: buyerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Buyer.findById(args.id);
            }
        },
        buyers: {
            type: new GraphQLList(buyerType),
            resolve() {
                return Buyer.find({});
            }
        }
    }
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        createBuyer: {
            type: buyerType,
            args: {
                input: { type: new GraphQLNonNull(buyerInputType) }
            },
            resolve: (source, {input}) => {
                const buyer = new Buyer({
                    firstName: input.firstName,
                    lastName: input.lastName,
                    email: input.email,
                    phoneNumber: input.phoneNumber,
                    password: input.password,
                    googleID: input.googleID,
                    facebookID: input.facebookID,
                    likedListings: input.likedListings,
                    favoritedListings: input.favoritedListings
                });
                return buyer.save();
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})