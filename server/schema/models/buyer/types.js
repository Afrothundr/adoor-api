import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { find as _find } from '../../../models/buyer/demographics.model';
import { find } from '../../../models/buyer/preferences.model';
import demographics from './demographics/types';
import preferences from './preferences/types';


export const buyer = new GraphQLObjectType({
    name: "buyer",
    description: 'buyer looking for a property listing',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: {
            type: GraphQLString,
            description: 'Buyer First Name'
        },
        lastname: {
            type: GraphQLString,
            description: 'Buyer Last Name'
        },
        email: {
            type: GraphQLString,
            description: 'Buyer email address'
        },
        phoneNumber: {
            type: GraphQLString,
            description: 'Buyer phone number'
        },
        password: {
            type: GraphQLString,
            description: 'Password'
        },
        googleID: {
            type: GraphQLString,
            description: 'Google ID'
        },
        facebookID: {
            type: GraphQLString,
            description: 'Facebook ID'
        },
        likedListings: {
            type: new GraphQLList(GraphQLString),
            description: 'A list of matched listings'
        },
        favoritedListings: {
            type: new GraphQLList(GraphQLString),
            description: 'A list of favorited matched listings'
        },
        preferences: {
            type: preferences,
            description: 'the preferences of the Buyer',
            resolve(parent){
                return find({buyerID: parent.id});
            } 
        },
        demographics: {
            type: demographics,
            description: 'the demographics of the Buyer',
            resolve(parent){
                return _find({buyerID: parent.id});
            } 
        }
    })
});