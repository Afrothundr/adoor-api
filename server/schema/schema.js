import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { createBuyer, updateBuyer } from './models/buyer/mutations';
import { RootQuery } from './models/buyer/queries';

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