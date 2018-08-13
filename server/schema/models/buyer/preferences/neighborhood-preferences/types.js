import { GraphQLObjectType, GraphQLBoolean, GraphQLID } from "graphql";

export const neighboorhoodPreference = new GraphQLObjectType({
    name: "neighborhood_preference",
    description: 'The neighboorhood prefrences for a buyer',
    fields: () => ({
        preferencesID: {
            type: GraphQLID,
            description: 'The id of the parent preferences container'
        },
        caresAboutSchoolChoice: {
            type: GraphQLBoolean,
            description: 'Does the Buyer care about local school scores?'
        },
        caresAboutGroceryStores: {
            type: GraphQLBoolean,
            description: 'Does the Buyer care about grocery store availability?'
        },
        caresAboutHospitals: {
            type: GraphQLBoolean,
            description: 'Does the Buyer care about having Healthcare providers nearby?'
        },
        caresAboutCrimeScore: {
            type: GraphQLBoolean,
            description: 'Does the Buyer care about the local crime rate?'
        },
        caresAboutParks: {
            type: GraphQLBoolean,
            description: 'Does the Buyer care about parks and recreation availability?'
        }
    })
});