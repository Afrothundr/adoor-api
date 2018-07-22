import { 
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList
} from 'graphql';
import { buyer } from './models/buyer/types';
const Buyer = require('../models/buyer/buyer.model');


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        buyer: {
            type: buyer,
            args: {
                id: {
                    descriptiopn: 'ID of buyer',
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(args) {
                return Buyer.findById(args.id);
            }
        },
        buyers: {
            type: new GraphQLList(buyer),
            resolve() {
                return Buyer.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createBuyer: {
            type: buyer,
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
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

