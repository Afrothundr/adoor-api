import { 
    GraphQLList,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLFloat
} from 'graphql';
import { outdoorFeaturesType} from './outdoor-features/types';
import { neighborhoodType } from './neighborhood/types';
import { sellerType } from '../types';


const Neighborhood = require('../../../../models/seller/neighborhood.model');
const OutdoorFeatures = require('../../../../models/seller/outdoor-features.model');
const Seller = require('../../../../models/seller/seller.model');

export const listingType = new GraphQLObjectType({
    name: "listing",
    description: 'property listing',
    fields: () => ({
        id: { type: GraphQLID },
        sellerID: {
            type: GraphQLString
        },
        seller: {
            type: sellerType,
            description: "Seller listing the property",
            resolve(parent) {
                return Seller.findById(parent.sellerID);
            }
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
        latitude: {
            type: GraphQLFloat
        },
        longitude: {
            type: GraphQLFloat
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
        neighborhood: {
            type: neighborhoodType,
            description: 'neighborhood of listing',
            resolve(parent) {
                return Neighborhood.findOne({ listingID: parent.id });
            }
        },
        outdoorFeatures: {
            type: outdoorFeaturesType,
            description: 'outdoorFeatures of listing',
            resolve(parent) {
                return OutdoorFeatures.findOne({ listingID: parent.id });
            }
        }
    })
});

export const listingInputType = new GraphQLInputObjectType({
    name: 'ListingCreateType',
    type: listingType,
    fields: {
        pictures: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
            description: 'url strings of listing photos'
        },
        description: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'description of property listing'
        },
        address: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'address of property listing'
        },
        city: {
            type: new GraphQLNonNull(GraphQLString)
        },
        zipcode: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        bedrooms: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'number of bedrooms in listing'
        },
        bathrooms: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'number of bathrooms in listing'
        },
        squareFootage: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        price: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        priceHistory: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
        },
        updated: {
            type: new GraphQLList(GraphQLString),
            description: 'log of when the listing was updated'
        },
        yearBuilt: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        renovatedYear: {
            type: GraphQLInt
        },
        heating: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'type of heating system'
        },
        cooling: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'type of cooling system'
        },
        kitchenType: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'type of kitchen'
        },
        laundry: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'types of laundry options'
        },
        fireplace: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: 'does property have fireplace'
        }
    }
});