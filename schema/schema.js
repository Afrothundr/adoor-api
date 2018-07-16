const {
    GraphQLObjectType,
    GraphQLSchema,
  } = require('graphql');

  const { queries, mutations } = require('./models/index');

  module.exports = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'RootQuery',
        fields: () => queries
      }),
      mutation: new GraphQLObjectType({
          name: 'RootMutation',
          fields: () => mutations
      })
  })

