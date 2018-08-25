import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { propertyPreference } from "./property-preferences/types";
import { neighboorhoodPreference } from "./neighborhood-preferences/types";

const PropertyPreferences = require('../../../../models/buyer/property-preferences.model');
const NeighboorhoodPreferences = require('../../../../models/buyer/neighborhood-preferences.model');

export const preferenceType = new GraphQLObjectType({
    name: "preferences",
    description: 'The prefrences for a buyer',
    fields: () => ({
        id: { type: GraphQLID },
        buyerID: { type: GraphQLString},
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
    })
});