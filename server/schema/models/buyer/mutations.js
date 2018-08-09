import { GraphQLNonNull, GraphQLID, GraphQLObjectType } from 'graphql';
import buyerType, { buyerInputType } from './types';

const Buyer = require('../../../models/buyer/buyer.model');


export const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
        createBuyer: {
            type: require('./types').buyerType,
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
            type: require('./types').buyerType,
            args: {
                id: { type: GraphQLID },
                update: { type: buyerInputType }
            },
            resolve: (parent, { id, update }) => {
                return Buyer.findOneAndUpdate({ _id: id }, update, (err, res) => {
                    if (err) {
                        return err;
                    }
                    return res;
                })
            }
        }
    })
});