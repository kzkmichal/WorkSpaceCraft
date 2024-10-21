import { gql } from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";

const typeDefs = gql`
	type Query {
		products(category: String, subcategory: String): [Product!]!
		product(id: ID!): Product
		setups: [Setup!]!
		setup(id: ID!): Setup
		articles: [Article!]!
		article(id: ID!): Article
	}

	type Mutation {
		createProduct(input: ProductInput!): Product!
		updateProduct(id: ID!, input: ProductInput!): Product!
		deleteProduct(id: ID!): Boolean!
		createReview(productId: ID!, input: ReviewInput!): Review!
		createSetup(input: SetupInput!): Setup!
		createArticle(input: ArticleInput!): Article!
	}

	# TODO: Define types for Product, Setup, Article, User, and Review
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });
