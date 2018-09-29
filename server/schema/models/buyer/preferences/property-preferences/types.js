import { GraphQLObjectType, GraphQLInt, GraphQLID, GraphQLInputObjectType, GraphQLNonNull } from "graphql";

export const propertyPreference = new GraphQLObjectType({
    name: "property_preference",
    description: 'The property prefrences for a buyer',
    fields: () => ({
        preferencesID: {
            type: GraphQLID,
            description: 'The id of the parent preferences container'
        },
        price: {
            type: GraphQLInt,
            description: 'The maximum price a buyer is willing to spend'
        },
        zipCode: {
            type: GraphQLInt,
            description: 'The prefered zipcode for the buyer'
        },
        bathrooms: {
            type: GraphQLInt,
            description: 'The amount of bathrooms required for the buyer'
        },
        bedrooms: {
            type: GraphQLInt,
            description: 'The amount of bedrooms required for the buyer'
        },
        squareFootage: {
            type: GraphQLInt,
            description: 'The minimum amount of square ootage required for the buyer'
        }
    })
});

export const propertyPreferenceInput = new GraphQLInputObjectType({
    name: "property_preference_input",
    bedrooms: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The amount of bedrooms required for the buyer'
    },
    bathrooms: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The amount of bathrooms required for the buyer'
    },
    budget: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The maximum price a buyer is willing to spend'
    },
    zipCode: {
        type:  new GraphQLNonNull(GraphQLInt),
        description: 'The prefered zipcode for the buyer'
    },
})