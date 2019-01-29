import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { sellerInputType } from './types';
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const Seller = require('../../../models/seller/seller.model');
const APIAuthKey = require('../../../models/api-auth.model');

const createSeller = {
    type: require('./types').sellerType,
    args: {
        input: { type: new GraphQLNonNull(sellerInputType) }
    },
    resolve: async (parent, { input }) => {
        const newSeller = new Seller({
            firstName: input.firstName,
            lastName: input.lastName,
            bio: input.bio,
            phoneNumber: input.phoneNumber,
            password: await bcrypt.hash(input.password, 10),
            email: input.email,
            company: input.company,
            profilePicture: input.profilePicture
        });
        return newSeller.save();
    }
}

const updateSeller = {
    type: require('./types').sellerType,
    args: {
        id: { type: GraphQLID },
        update: { type: sellerInputType }
    },
    resolve: (parent, { id, update }) => {
        return Seller.findOneAndUpdate({ _id: id }, update, (err, res) => {
            if (err) {
                throw new Error(err);
            }
            return res;
        })
    }
}

const sellerLogin = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        apiKey: { type: GraphQLString }
    },
    resolve: async (parent, { email, password, apiKey }) => {
        const seller = await Seller.findOne({ email: email });
        if (!seller) {
            throw new Error('email does not match any records');
        }
        const valid = await bcrypt.compare(password, seller.password)
        if (!valid) {
            throw new Error('Incorrect password');
        }
        const authenticated = await APIAuthKey.findOne({apiKey: apiKey});
        if (!authenticated) throw new Error('Invalid API key');

        return jsonwebtoken.sign(
            { id: seller.id, email: seller.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )
    }
}

export const sellerMutations = {
    createSeller: createSeller,
    updateSeller: updateSeller,
    sellerLogin: sellerLogin,
}