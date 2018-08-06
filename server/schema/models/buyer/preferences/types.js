import { GraphQLObjectType } from "graphql";
import { find } from '../../../../models/buyer/property-preferences.model';
import { find as _find } from '../../../../models/buyer/neighborhood-preferences.model';


export const preferenceType = new GraphQLObjectType({
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
                    return find({ preferencesID: parent.id });
                }
            },
            neighboorhoodPreference: {
                type: neighboorhoodPreference,
                description: 'Neighboorhood preferences for the Buyer',
                resolve(parent) {
                    return _find({ preferencesID: parent.id });
                }
            }
        }
    }
});