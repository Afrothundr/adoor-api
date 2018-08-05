
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { buyerQueries } from './models/buyer/queries';
import { buyerMutations } from './models/buyer/mutations';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
      name: 'query',
      fields: () => ({
          ...buyerQueries
      })
  }),
  mutation: new GraphQLObjectType({
      name: 'mutations',
      fields: () => ({
          ...buyerMutations
      })
  })
});