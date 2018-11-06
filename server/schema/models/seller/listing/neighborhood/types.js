import { GraphQLString, GraphQLID, GraphQLObjectType, GraphQLInt } from 'graphql';
 
export const neighborhoodType = new GraphQLObjectType({
    name: "neighborhood",
    description: 'neighborhood of property listing',
    fields: () => ({
        id: { type: GraphQLID },
        listingID: {
            type: GraphQLString,
            description: 'id of listing parent listing property'
        },
        schoolRank: {
            type: GraphQLInt,
            description: 'Number of schools in the area'
        },
        groceryRank: {
            type: GraphQLInt,
            description: 'Number of grocery stores in the area'
        },
        hospitalRank: {
            type: GraphQLInt,
            description: 'Number of hospitals/clinics in the area'
        },
        crimeRank: {
            type: GraphQLInt,
            description: 'Number of property crimes in a year commited in the area'
        },
        parksRank: {
            type: GraphQLInt,
            description: 'Number of parks in the area'
        }
    })
});