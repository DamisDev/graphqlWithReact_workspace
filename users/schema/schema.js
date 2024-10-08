/////// REMEMBER: the schema is what tell GraphQL exactly what our data looks like /////

const { graphql } = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = require('graphql');
const {response} = require("express");

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      description: { type: GraphQLString }
    }
  });

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(resp => resp.data);
            }
        }
    },
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
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(resp => {
                        if (resp?.data) {
                            return resp.data;
                        } else {
                            throw new Error("Utente non trovato");
                        }
                    })
                    .catch(error => {
                        throw new Error(error.message);
                    });
            },
        },
    },
});

// export the schema that I've just created
module.exports = new GraphQLSchema({
    query: RootQuery,
});
