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


/**
 * In questa sezione abbiamo iniziato a implementare la nostra ROOT QUERY,
 * che viene utilizzata per consentire a GraphQL di entrare nel grafo dei dati della nostra applicazione.
 * La parte più importante di questa query principale (ROOT QUERY) è la funzione RESOLVE,
 * che viene utilizzata per restituire un pezzo effettivo di dati dal nostro database,
 * dal nostro archivio di dati o da qualsiasi cosa contenga i nostri dati.
 * 
 */
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
           type: UserType,
           args: { id: {type: GraphQLString}},
           resolve(parentValue, args) {            
           }
        }
    }
});