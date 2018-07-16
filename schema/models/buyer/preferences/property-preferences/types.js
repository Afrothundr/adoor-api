const {
    GraphQLObjectType,
    GraphQLInt
  } = require("graphql");

const propertyPreference =  new GraphQLObjectType({
    name: "property-preference",
    description: 'The property prefrences for a buyer',
    fields: () => ({
      price : { 
          type: GraphQLInt, 
          description: 'The maximum price a buyer is willing to spend'
      },
      zipCode : { 
          type: GraphQLInt, 
          description: 'The prefered zipcode for the buyer'
      },
      bathrooms : {
          type: GraphQLInt, 
          description: 'The amount of bathrooms required for the buyer'
      },
      bedrooms : { 
          type: GraphQLInt, 
          description: 'The amount of bedrooms required for the buyer'
      },
      squareFootage : { 
          type: GraphQLInt, 
          description: 'The minimum amount of square ootage required for the buyer'
      } 
    })
}); 

module.exports = { propertyPreference };