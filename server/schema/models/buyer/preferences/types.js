import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { propertyPreference } from "./property-preferences/types";
import { neighborhoodPreference } from "./neighborhood-preferences/types";

const PropertyPreferences = require('../../../../models/buyer/property-preferences.model');
const NeighborhoodPreferences = require('../../../../models/buyer/neighborhood-preferences.model');

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
                return PropertyPreferences.findOne(parent.propertyPreference);
            }
        },
        neighborhoodPreference: {
            type: neighborhoodPreference,
            description: 'Neighborhood preferences for the Buyer',
            resolve(parent) {
                return NeighborhoodPreferences.findOne(parent.neighborhoodPreference);
            }
        }
    })
});