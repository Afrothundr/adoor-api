import { GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';

import buyerType from './types';
import { findById, find } from '../../../models/buyer/buyer.model';

export default Buyer => ({
    buyer: {
        type: buyerType,
        args: {
            id: {
                descriptiopn: 'ID of buyer',
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(args) {
            return findById(args.id);
        }
    },
    buyers: {
        type: new GraphQLList(buyerType),
        resolve() {
            return find({});
        }
    }
})