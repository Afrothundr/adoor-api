import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { createBuyer, updateBuyer } from './models/buyer/mutations';
import { buyer, buyers } from './models/buyer/queries';

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
        createBuyer: createBuyer,
        updateBuyer: updateBuyer
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        buyer: buyer,
        buyers: buyers
    })
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})