"use client";

import { useState } from "react";
import { TagProductsViewProps } from "./types";
import { useProductsByTagQuery } from "@/graphql/generated/graphql";
import { ProductList } from "@/components/modules/products/ProductList";
import { Container, Stack } from "@/components/common/molecules";
// import { LoadingSpinner } from "@/components/common/atoms/LoadingSpinner";
import { Button } from "@/components/ui/button";

export const TagProductsView = ({
	tag,
	"data-testid": testId = "tag-products",
}: TagProductsViewProps) => {
	const [page, setPage] = useState(1);
	const limit = 12;
	const offset = (page - 1) * limit;

	const { data, loading, fetchMore } = useProductsByTagQuery({
		variables: {
			tagSlug: tag.slug,
			limit,
			offset,
		},
	});

	const products = data?.productsByTag || [];

	const handleLoadMore = async () => {
		try {
			await fetchMore({
				variables: {
					offset: products.length,
					limit,
				},
			});
			setPage(page + 1);
		} catch (error) {
			console.error("Error loading more products:", error);
		}
	};

	return (
		<Container data-testid={testId} as={"section"}>
			<Stack direction="column" spacing={6}>
				<div>
					<h1 className="text-3xl font-bold">
						Products tagged with: {tag.name}
					</h1>
					<p className="mt-2 text-gray-600">
						Browse all products with this tag
					</p>
				</div>

				{loading && products.length === 0 ? (
					<div className="flex items-center justify-center py-12">
						{/* <LoadingSpinner size="lg" /> */}
					</div>
				) : products.length === 0 ? (
					<div className="rounded-lg border bg-gray-50 p-8 text-center">
						<h2 className="text-lg font-medium">No products found</h2>
						<p className="mt-2 text-gray-600">
							There are no products with this tag yet.
						</p>
					</div>
				) : (
					<>
						<ProductList
							products={products}
							data-testid={`${testId}-product-list`}
						/>

						{products.length >= limit && (
							<div className="mt-6 flex justify-center">
								<Button
									onClick={handleLoadMore}
									disabled={loading}
									variant="outline"
									data-testid={`${testId}-load-more`}
								>
									{loading ? "Loading..." : "Load More"}
								</Button>
							</div>
						)}
					</>
				)}
			</Stack>
		</Container>
	);
};
