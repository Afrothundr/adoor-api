import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLID } from "graphql";

export const demographicsType = new GraphQLObjectType({
    name: "demographics",
    description: 'The demographics of the buyer',
    fields: () => ({
        buyerID: {
            type: GraphQLID,
            description: 'ID of parent buyer'
        },
        income: {
            type: GraphQLInt,
            description: 'upper income of the Buyer'
        },
        kids: {
            type: GraphQLInt,
            description: 'youngest age of kids'
        },
        ageRange: {
            type: GraphQLInt,
            description: 'younger limit of age Range'
        },
        pets: {
            type: GraphQLString,
            description: 'type of pet owned by Buyer'
        },
        gender: {
            type: GraphQLString,
            description: 'The prefered gender identity of the Buyer'
        }
    })
});