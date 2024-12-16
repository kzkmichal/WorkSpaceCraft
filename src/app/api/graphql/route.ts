import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { schema } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";
import { createContext } from "@/graphql/context";

const server = new ApolloServer({
	schema,
	resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
	context: async (req, res) => createContext({ req, res }),
});

export { handler as GET, handler as POST };
