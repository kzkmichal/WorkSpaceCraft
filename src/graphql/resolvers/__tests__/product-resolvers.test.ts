import { GraphQLError, GraphQLResolveInfo } from "graphql";
import { resolvers } from "../product-resolvers";
import { prismaMock } from "@/lib/prisma/__mocks__";
import type { Product } from "@/graphql/generated/graphql";

describe("Product Resolvers", () => {
	describe("Query.products", () => {
		it("fetches products with pagination", async () => {
			const mockProducts = [
				{
					id: "1",
					title: "Test Product",
					description: "Test Description",
					price: 99.99,
					imageUrl: "/test.jpg",
					category: "test",
					subcategory: null,
					createdAt: new Date(),
					updatedAt: new Date(),
					userId: "1",
					createdBy: {
						id: "1",
						name: "Test User",
						email: "test@test.com",
						password: "hashed",
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				},
			];

			prismaMock.product.findMany.mockResolvedValue(mockProducts);

			const result = await resolvers.Query?.products?.(
				{}, // parent
				{ limit: 10, offset: 0 }, // args
				{ prisma: prismaMock, user: null }, // context
				{} as GraphQLResolveInfo, // info
			);

			const products = (await Promise.resolve(result)) as Product[];

			expect(products).toHaveLength(1);
			expect(products?.[0].title).toBe("Test Product");
		});
	});

	// Test dla Mutation.createProduct
	describe("Mutation.createProduct", () => {
		const mockInput = {
			title: "New Product",
			description: "Description",
			price: 99.99,
			imageUrl: "/test.jpg",
			category: "test",
		};

		it("creates product when user is authenticated", async () => {
			const mockProduct = {
				id: "1",
				...mockInput,
				subcategory: null,
				createdAt: new Date(),
				updatedAt: new Date(),
				userId: "1",
				createdBy: {
					id: "1",
					name: "Test User",
					email: "test@test.com",
					password: "hashed",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			};

			prismaMock.product.create.mockResolvedValue(mockProduct);

			const result = await resolvers.Mutation?.createProduct?.(
				{},
				{ input: mockInput },
				{
					prisma: prismaMock,
					user: { id: "1", email: "test@test.com" },
				},
				{} as GraphQLResolveInfo,
			);

			expect(result?.title).toBe(mockInput.title);
		});

		it("throws error when user is not authenticated", async () => {
			await expect(
				resolvers.Mutation?.createProduct?.(
					{},
					{ input: mockInput },
					{ prisma: prismaMock, user: null },
					{} as GraphQLResolveInfo,
				),
			).rejects.toThrow(GraphQLError);
		});
	});
});
