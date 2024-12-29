import { join } from "path";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers/index";

const schemaPath = join(
	process.cwd(),
	"src/graphql/schema/**/*.graphql",
);

const typeDefs = loadSchemaSync(schemaPath, {
	loaders: [new GraphQLFileLoader()],
});
// TODO: Define types for Product, Setup, Article, User, and Review
export const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});
