import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { find, findById } from '../../../models/buyer/buyer.model';
import buyerType from './types';


export default buyerQueries = {
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
};