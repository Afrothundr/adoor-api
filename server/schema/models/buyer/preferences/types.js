import { GraphQLObjectType } from "graphql";

import propertyPreference from './property-preferences/types';
import neighboorhoodPreference from './neighborhood-preferences/types';
import { find } from '../../../../models/buyer/property-preferences.model';
import { find as _find } from '../../../../models/buyer/neighborhood-preferences.model';


export const preference =  new GraphQLObjectType({
    name: "preferences",
    description: 'The prefrences for a buyer',
    fields: () => ({
      id: { type: GraphQLID },
      propertyPreference : { 
          type: propertyPreference, 
          description: 'Propery preferences for the Buyer',
          resolve(parent) {
              return find({preferencesID: parent.id});
          }
      },
      neighboorhoodPreference : { 
          type: neighboorhoodPreference, 
          description: 'Neighboorhood preferences for the Buyer',
          resolve(parent) {
            return _find({preferencesID: parent.id});
        }
      }
    })
});