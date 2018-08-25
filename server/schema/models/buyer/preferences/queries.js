
import { GraphQLID } from 'graphql';

const Preference = require('../../../../models/buyer/preferences.model');
export const preferences = {
    type: require('./types').preferenceType,
    args: { buyerID: { type: GraphQLID } },
    resolve(parent, {buyerID}) {
        return Preference.find({buyerID: buyerID}, (err, res) => {
            if (err) return err;
            return res;
        });
    }
}