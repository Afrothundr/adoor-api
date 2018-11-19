import { GraphQLObjectType, GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLString, GraphQLInt } from "graphql";

export const neighborhoodPreference = new GraphQLObjectType({
    name: "neighborhood_preference",
    description: 'The neighborhood prefrences for a buyer',
    fields: () => ({
        preferencesID: {
            type: GraphQLID,
            description: 'The id of the parent preferences container'
        },
        hasYoungKids: {
            type: GraphQLBoolean,
            description: 'Does the Buyer have young kids?'
        },
        livesAlone: {
            type: GraphQLBoolean,
            description: 'Does the Buyer live alone?'
        },
        hasPets: {
            type: GraphQLBoolean,
            description: 'Does the Buyer have large pets?'
        },
        exercises: {
            type: GraphQLBoolean,
            description: 'Does the Buyer like to excercie?'
        }
    })
});

export const neighborhoodPreferenceInput = new GraphQLInputObjectType({
    name: "neighborhood_preference_",
    type: neighborhoodPreference,
    fields: {
        hasYoungKids: {
            type: GraphQLBoolean,
            description: 'Does the Buyer have young kids?'
        },
        livesAlone: {
            type: GraphQLBoolean,
            description: 'Does the Buyer live alone?'
        },
        hasPets: {
            type: GraphQLBoolean,
            description: 'Does the Buyer have large pets?'
        },
        exercises: {
            type: GraphQLBoolean,
            description: 'Does the Buyer like to excercie?'
        }
    }
});