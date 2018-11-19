import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { demographicsQueries } from './models/buyer/demographics/queries';
import { buyerMutations } from './models/buyer/mutations';
import { preferencesQueries } from './models/buyer/preferences/queries';
import { buyerQueries } from './models/buyer/queries';
import { listingMutations } from './models/seller/listing/mutations';
import { listingQueries } from './models/seller/listing/queries';
import { sellerMutations } from './models/seller/mutations';
import { sellerQueries } from './models/seller/queries';

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        ...buyerQueries,
        ...preferencesQueries,
        ...demographicsQueries,
        ...sellerQueries,
        ...listingQueries
    })
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
        ...buyerMutations,
        ...sellerMutations,
        ...listingMutations
    })
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})