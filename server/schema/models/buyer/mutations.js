import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { neighborhoodPreferenceInput } from './preferences/neighborhood-preferences/types';
import { propertyPreferenceInput } from './preferences/property-preferences/types';
import { buyerInputType, buyerType } from './types';
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const Buyer = require('../../../models/buyer/buyer.model');
const PreferencesParentModel = require('../../../models/buyer/preferences.model');
const NeighborHoodPreferenceModel = require('../../../models/buyer/neighborhood-preferences.model');
const PropertyPreferenceModel = require('../../../models/buyer/property-preferences.model');
const createBuyer = {
    type: require('./types').buyerType,
    args: {
        input: { type: new GraphQLNonNull(buyerInputType) }
    },
    resolve: async (parent, { input }) => {
        const buyer = new Buyer({
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phoneNumber: input.phoneNumber,
            password: await bcrypt.hash(input.password, 10),
            googleID: input.googleID,
            facebookID: input.facebookID,
            likedListings: [],
            favoritedListings: []
        });
        return buyer.save();
    }
}

const updateBuyer = {
    type: require('./types').buyerType,
    args: {
        id: { type: GraphQLID },
        update: { type: buyerInputType }
    },
    resolve: (parent, { id, update }) => {
        return Buyer.findOneAndUpdate({ _id: id }, update, (err, res) => {
            if (err) {
                return err;
            }
            return res;
        })
    }
}

const buyerLogin = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve: async (parent, { email, password }) => {
        const buyer = await Buyer.findOne({ email: email });
        if (!buyer) {
            return 'email does not match any records';
        }
        const valid = await bcrypt.compare(password, buyer.password)
        if (!valid) {
            throw new Error('Incorrect password')
        }

        return jsonwebtoken.sign(
            { id: buyer.id, email: buyer.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )
    }
}

const savePreferences = {
    type: buyerType,
    args: {
        neighborhoodPreferences: { type: neighborhoodPreferenceInput },
        propertyPreferences: { type: propertyPreferenceInput }
    },
    resolve: async (_, { neighborhoodPreferences, propertyPreferences }, { user }) => {
        const propertyPreferencesDocument = await new PropertyPreferenceModel({
            ...propertyPreferences
        }).save().then(document => document );
        const neighborHoodPreferencesDocument = await new NeighborHoodPreferenceModel({
            ...neighborhoodPreferences
        }).save().then(document => document );
        const parentPreferencesDocument = await new PreferencesParentModel({
            buyerID: user.id,
            neighborhood_preferences: propertyPreferencesDocument._id,
            property_preferences: neighborHoodPreferencesDocument._id
        }).save().then(document => document);
        return Buyer
            .findByIdAndUpdate(user.id, {
                $set: {
                    preferences: parentPreferencesDocument._id
                }
            }, {new: true});
    }
}

const saveMatch = {
    type: buyerType,
    args: {
         listingId: { type: GraphQLID }
    },
    resolve: async (_, { listingId }, { user }) => {
        return Buyer
            .findByIdAndUpdate(user.id, {
                $push: {
                    matches: listingId
                }
        }, {new: true});
    }
}

const deleteMatch = {
    type: buyerType,
    args: {
         listingId: { type: GraphQLID }
    },
    resolve: async (_, { listingId }, { user }) => {

        return Buyer
            .findByIdAndUpdate(user.id, {
                $pull: {
                    matches: listingId
                }
        }, {new: true});
    }
}

const favoriteMatch = {
    type: buyerType,
    args: {
         listingId: { type: GraphQLID }
    },
    resolve: async (_, { listingId }, { user }) => {
        return Buyer
            .findByIdAndUpdate(user.id, {
                $push: {
                    favoriteMatches: listingId
                },
        }, {new: true});
    }
}

const unfavoriteMatch = {
    type: buyerType,
    args: {
         listingId: { type: GraphQLID }
    },
    resolve: async (_, { listingId }, { user }) => {

        return Buyer
            .findByIdAndUpdate(user.id, {
                $pull: {
                    favoriteMatches: listingId
                }
        }, {new: true});
    }
}

export const buyerMutations = {
    createBuyer: createBuyer,
    updateBuyer: updateBuyer,
    buyerLogin: buyerLogin,
    savePreferences: savePreferences,
    saveMatch: saveMatch,
    deleteMatch: deleteMatch,
    favoriteMatch: favoriteMatch,
    unfavoriteMatch: unfavoriteMatch
}