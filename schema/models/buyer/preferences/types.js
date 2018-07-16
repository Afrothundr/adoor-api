const {
    GraphQLObjectType
  } = require("graphql");

const propertyPreference = require('./property-preferences/types');
const neighboorhoodPreference = require('./neighborhood-preferences/types');
const PropertyPreferenceModel = require( '../../../../models/buyer/property-preferences.model');
const NeighboorhoodPreferenceModel = require('../../../../models/buyer/neighborhood-preferences.model');


const preference =  new GraphQLObjectType({
    name: "preferences",
    description: 'The prefrences for a buyer',
    fields: () => ({
      id: { type: GraphQLID },
      propertyPreference : { 
          type: propertyPreference, 
          description: 'Propery preferences for the Buyer',
          resolve(parent) {
              return PropertyPreferenceModel.find({preferencesID: parent.id});
          }
      },
      neighboorhoodPreference : { 
          type: neighboorhoodPreference, 
          description: 'Neighboorhood preferences for the Buyer',
          resolve(parent) {
            return NeighboorhoodPreferenceModel.find({preferencesID: parent.id});
        }
      }
    })
});

module.exports = { preference };