import { 
    GraphQLList,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt
} from 'graphql';
import { outdoorFeaturesType} from './outdoor-features/types';
import { neighborhoodType } from './neighborhood/types';

const Neighboorhood = require('../../../../models/seller/neighborhood.model');
const OutdoorFeatures = require('../../../../models/seller/outdoor-features.model');

export const listingType = new GraphQLObjectType({
    name: "listing",
    description: 'property listing',
    fields: () => ({
        id: { type: GraphQLID },
        sellerID: {
            type: GraphQLID,
            description: 'the id of the seller listing the property'
        },
        pictures: {
            type: new GraphQLList(GraphQLString),
            description: 'url strings of listing photos'
        },
        description: {
            type: GraphQLString,
            description: 'description of property listing'
        },
        address: {
            type: GraphQLString,
            description: 'address of property listing'
        },
        city: {
            type: GraphQLString
        },
        zipcode: {
            type: GraphQLInt
        },
        bedrooms: {
            type: GraphQLInt,
            description: 'number of bedrooms in listing'
        },
        bathrooms: {
            type: GraphQLInt,
            description: 'number of bathrooms in listing'
        },
        squareFootage: {
            type: GraphQLInt
        },
        price: {
            type: GraphQLInt
        },
        priceHistory: {
            type: new GraphQLList(GraphQLInt)
        },
        updated: {
            type: new GraphQLList(GraphQLString),
            description: 'log of when the listing was updated'
        },
        views: {
            type: GraphQLInt,
            description: 'total number of people who viewed the property'
        },
        yearBuilt: {
            type: GraphQLInt
        },
        renovatedYear: {
            type: GraphQLInt
        },
        heating: {
            type: GraphQLString,
            description: 'type of heating system'
        },
        cooling: {
            type: GraphQLString,
            description: 'type of cooling system'
        },
        kitchenType: {
            type: GraphQLString,
            description: 'type of kitchen'
        },
        laundry: {
            type: GraphQLString,
            description: 'types of laundry options'
        },
        fireplace: {
            type: GraphQLBoolean,
            description: 'does property have fireplace'
        },
        neighboorhood: {
            type: neighborhoodType,
            description: 'neighboorhood of listing',
            resolve(parent) {
                return Neighboorhood.find({ listingID: parent.id });
            }
        },
        outdoorFeatures: {
            type: outdoorFeaturesType,
            description: 'outdoorFeatures of listing',
            resolve(parent) {
                return OutdoorFeatures.find({ listingID: parent.id });
            }
        }
    })
});