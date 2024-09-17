const expressGraphQL = require("express-graphql").graphqlHTTP;
const express = require("express");
const schema = require("./schema/schema");
const app = express();

app.use(
    "/graphql",
    expressGraphQL({
        schema,
        graphiql: true,
    })
);

app.listen(4000, () => {
    console.log("Listening on port 4000: http://localhost:4000/graphql");
});
