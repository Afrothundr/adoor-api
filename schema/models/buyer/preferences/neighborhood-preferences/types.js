const {
    GraphQLObjectType,
    GraphQLBoolean
  } = require("graphql");

const neighboorhoodPreference =  new GraphQLObjectType({
    name: "neighborhood-preference",
    description: 'The neighboorhood prefrences for a buyer',
    fields: () => ({
      caresAboutSchoolChoice : { 
          type: GraphQLBoolean, 
          description: 'Does the Buyer care about local school scores?'
      },
      caresAboutGroceryStores : { 
          type: GraphQLBoolean,
          description: 'Does the Buyer care about grocery store availability?'
      },
      caresAboutHospitals : {
          type: GraphQLBoolean,
          description: 'Does the Buyer care about having Healthcare providers nearby?'
      },
      caresAboutCrimeScore : { 
          type: GraphQLBoolean,
          description: 'Does the Buyer care about the local crime rate?'
      },
      caresAboutParks : { 
          type: GraphQLBoolean ,
          description: 'Does the Buyer care about parks and recreation availability?'
      } 
    })
});

module.exports = { neighboorhoodPreference }