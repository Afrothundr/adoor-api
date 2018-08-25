import { GraphQLID } from 'graphql';

const Demographics = require('../../../../models/buyer/demographics.model');

export const demographics = {
    type: require('./types').demographicsType,
    args: { buyerID: { type: GraphQLID } },
    resolve(parent, {buyerID}) {
        return Demographics.find({buyerID: buyerID}, (err, res) => {
            if (err) return err;
            return res;
        });
    }
}