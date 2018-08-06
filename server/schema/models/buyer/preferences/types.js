import { GraphQLObjectType } from "graphql";


export const preference = new GraphQLObjectType({
    name: "preferences",
    description: 'The prefrences for a buyer',
    fields: () => {
        const propertyPreference = require('./property-preferences/types');
        const neighboorhoodPreference = require('./neighborhood-preferences/types');
        return {
            id: { type: GraphQLID },
            propertyPreference: {
                type: propertyPreference,
                description: 'Propery preferences for the Buyer',
                resolve(parent) {
                    return PropertyPreferences.find({ preferencesID: parent.id });
                }
            },
            neighboorhoodPreference: {
                type: neighboorhoodPreference,
                description: 'Neighboorhood preferences for the Buyer',
                resolve(parent) {
                    return NeighboorhoodPreferences.find({ preferencesID: parent.id });
                }
            }
        }
    }
});