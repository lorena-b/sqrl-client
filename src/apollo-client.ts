import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client"

import fetch from "cross-fetch"

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URI,
    fetch,
})

// https://dev.to/tmaximini/accessing-authorization-headers-in-apollo-graphql-client-3b50
const client = new ApolloClient({
    link: ApolloLink.from([httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

export default client
