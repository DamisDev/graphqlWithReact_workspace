// REMEMBER: the schema is what tell GraphQL exactly what our data looks like
const graphql = require ('graphql');

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString},
        firstName: { type: GraphQLString},
        age: { type: GraphQLInt}
    }
});