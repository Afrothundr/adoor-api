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
        schoolChoice: {
            type: GraphQLInt,
            description: 'Number of schools in the area'
        },
        groceryStores: {
            type: GraphQLInt,
            description: 'Number of grocery stores in the area'
        },
        hospitals: {
            type: GraphQLInt,
            description: 'Number of hospitals/clinics in the area'
        },
        crimeScore: {
            type: GraphQLInt,
            description: 'Number of property crimes in a year commited in the area'
        },
        parks: {
            type: GraphQLInt,
            description: 'Number of parks in the area'
        }
    })
});