import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { createBuyer, updateBuyer } from './models/buyer/mutations';
import { buyer, buyers } from './models/buyer/queries';
import { preferences } from './models/buyer/preferences/queries';
import { demographics } from './models/buyer/demographics/queries';

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        buyer: buyer,
        buyers: buyers,
        preferences: preferences,
        demographics: demographics
    })
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
        createBuyer: createBuyer,
        updateBuyer: updateBuyer
    })
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})