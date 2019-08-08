import { ApolloClient, Resolvers } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { Root, Learner, Bounds, rootHandler } from "state"
import { buildSchemaSync, Resolver, ObjectType, Field } from "type-graphql"
import { createResolversMap } from "type-graphql/dist/utils/createResolversMap"
import { printSchema } from "graphql"
import { createStore } from "shapeql"
import { setContext } from "apollo-link-context"

const httpLink = createHttpLink({ uri: `http://localhost:${process.env.PORT}` })
const contextLink = setContext(() => ({
    headers: { authorization: `Bearer ${store.query({ token: null }).token}` }
}))

//TODO: https://trello.com/c/QjInW5CL fix BrowserEventInput type

@ObjectType()
export class BrowserEventInput {
    @Field()
    type: string

    @Field()
    selector: string

    @Field()
    value: string
}

@Resolver(of => BrowserEventInput)
export class BrowserEventResolver { }

@Resolver(of => Learner)
export class LearnerResolver { }

@Resolver(of => Bounds)
export class BoundsResolver { }

export const schema = buildSchemaSync({
    resolvers: [BrowserEventResolver, LearnerResolver, BoundsResolver],
    skipCheck: true
})

export const typeDefs = printSchema(schema)

export const resolvers = createResolversMap(schema)

export const cache = new InMemoryCache()
export const client = new ApolloClient({
    link: contextLink.concat(httpLink),
    cache,
    typeDefs,
    resolvers: resolvers as Resolvers
})
export const store = createStore({
    rootClass: Root,
    client: client as any,
    handler: rootHandler
})