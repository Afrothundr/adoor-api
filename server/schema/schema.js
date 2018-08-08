import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
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
            resolve: (parent, { input }) => {
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
        },
        updateBuyer: {
            type: buyerType,
            args: {
                id: { type: GraphQLID },
                update: { type: buyerInputType }
            },
            resolve: (parent, { id, update }) => {
                const selectedBuyer = Buyer.findById(id);
                if (!!selectedBuyer) {
                     selectedBuyer.update(
                        {
                            "firstName": update.firstName,
                            "lastName": update.lastName,
                            "email": update.email,
                            "phoneNumber": update.phoneNumber
                        }, { id: id }, { upsert: true });
                    return Buyer.findById(id);
                } else {
                    throw new Error(`No Record found with an id of ${id}`);
                }
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})