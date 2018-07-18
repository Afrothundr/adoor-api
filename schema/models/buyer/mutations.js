import { GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';

import buyerType from './types';
import BuyerModelType from '../../../models/buyer/buyer.model';

export default Buyer => ({
    createBuyer: {
        type: buyerType,
        args: {
            firstName: {
                description: 'First Name',
                type: new GraphQLNonNull(GraphQLString)
            },
            lastName: {
                description: 'Last Name',
                type: new GraphQLNonNull(GraphQLString)
            },
            email: {
                description: 'Email Address',
                type: new GraphQLNonNull(GraphQLString)
            },
            phoneNumber: {
                description: 'Phone Number',
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                description: 'password',
                type: new GraphQLNonNull(GraphQLString)
            },
            googleID: {
                description: 'Google OAuth Token',
                type: GraphQLString
            },
            facebookID: {
                description: 'Google OAuth Token',
                type: GraphQLString
            },
            likedListings: {
                description: 'List of matched listings',
                type: new GraphQLNonNull(new GraphQLList(GraphQLString))
            },
            favoritedListings: {
                description: 'List of favorited listings',
                type: new GraphQLNonNull(new GraphQLList(GraphQLString))
            },
            resolve(args) {
                const buyer = new BuyerModelType({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    phoneNumber: args.phoneNumber,
                    password: args.password,
                    googleID: args.googleID,
                    facebookID: args.facebookID,
                    likedListings: args.likedListings,
                    favoritedListings: args.favoritedListings
                });
                return buyer.save();
            }
        }
    }
});