const {ApolloServer} = require('@apollo/server');
const {expressMiddleware} = require('@apollo/server/express4');
const gql = require('graphql-tag');
const {Books} = require('./Graphql/Books/index');
const {Notification} = require('./Graphql/Notifications/index');
const {Users} = require('./Graphql/Users/index');

const typeDefs = gql`
    type Query {
        ${Books.queries}
    }

    type Book {
        id : ID ,
        title : String,
        author : String,
        summary : String,
        category : String,
        image : String,
        price : Float,
        discount : Float,
    }

    type User {
        id : ID ,
        name : String,
        email : String,
        password : String,
        otp : String,
        isVerified : Boolean,
        token : String,
        createdAt : String,
        wishList : [Book],
    }

    type Response {
        success : Boolean,
        message : String,
        statusCode : Int,
    }

    type Mutation {
        ${Books.mutation} 
        ${Notification.mutations}
        ${Users.mutations}
    }
`;

const resolvers = {
    Query : {
        ...Books.resolvers.queries,
        // ...Notification.resolvers.queries,
    },
    
    Mutation : {
        ...Books.resolvers.mutations,
        ...Notification.resolvers.mutations,
        ...Users.resolvers.mutations,
    },
}


async function graphQLServer (app) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use('/graphql' , expressMiddleware(server));
}

module.exports = graphQLServer;