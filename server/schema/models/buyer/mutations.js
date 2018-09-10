import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { buyerInputType } from './types';
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const Buyer = require('../../../models/buyer/buyer.model');

export const createBuyer = {
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
            likedListings: input.likedListings,
            favoritedListings: input.favoritedListings
        });
        return buyer.save();
    }
}

export const updateBuyer = {
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

export const buyerLogin = {
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