import { GraphQLString, GraphQLID, GraphQLObjectType, GraphQLInt } from 'graphql';
import { GraphQLBoolean } from 'graphql';


export const outdoorFeaturesType = new GraphQLObjectType({
    name: "outdoor_features",
    description: 'outdoor features of property listing',
    fields: () => ({
        id: { type: GraphQLID },
        listingID: {
            type: GraphQLString,
            description: 'id of listing parent listing property'
        },
        fencedYard: {
            type: GraphQLBoolean,
            description: 'is it a fenced in backyard?'
        },
        sprinklerSystem: {
            type: GraphQLBoolean,
            description: 'is there a sprinkler system?'
        },
        firePit: {
            type: GraphQLBoolean,
            description: 'is there a fire pit?'
        },
        pool: {
            type: GraphQLBoolean,
            description: 'pool availability'
        },
        parking: {
            type: GraphQLString,
            description: 'style of parking available'
        },
        garage: {
            type: GraphQLString,
            description: 'style of garage'
        }
    })
});