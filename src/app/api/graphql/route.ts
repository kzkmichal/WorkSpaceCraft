import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { schema } from "@/graphql/schema";
import { createContext, type ApolloContext } from "@/graphql/context";

const server = new ApolloServer<ApolloContext>({
	schema,
});

const handler = startServerAndCreateNextHandler(server, {
	context: async () => createContext(),
});

export { handler as GET, handler as POST };
