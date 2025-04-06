import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { schema } from "@/graphql/schema";
import { createContext, type ApolloContext } from "@/graphql/context";

const server = new ApolloServer<ApolloContext>({
	schema,
});

const apolloHandler = startServerAndCreateNextHandler(server, {
	context: async () => createContext(),
});

export async function GET(request: Request) {
	return apolloHandler(request);
}

export async function POST(request: Request) {
	return apolloHandler(request);
}
