"use client";

import { useState } from "react";
import Image from "next/image";
import { UserProductsProps } from "./types";
import { deleteProduct } from "@/app/actions/product";
import { Link } from "@/components/common/atoms";
import { Button } from "@/components/ui/button";

export const UserProducts = ({
	products,
	"data-testid": testId = "user-products",
}: UserProductsProps) => {
	const [isDeleting, setIsDeleting] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this product?")) {
			return;
		}

		setIsDeleting(id);
		setError(null);

		try {
			const result = await deleteProduct(id);

			if (!result.success) {
				setError(result.error || "An unexpected error occurred");
			}
		} catch (err) {
			setError("An unexpected error occurred");
			console.error(err);
		} finally {
			setIsDeleting(null);
		}
	};

	if (products.length === 0) {
		return (
			<div className="rounded-lg border bg-gray-50 py-10 text-center">
				<p className="mb-4 text-gray-500">
					You haven&apos;t added any products yet.
				</p>
				<Link
					href="/products/add"
					className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
				>
					Add Your First Product
				</Link>
			</div>
		);
	}

	return (
		<div>
			{error && (
				<div className="mb-4 rounded-md bg-red-50 p-4 text-red-600">
					{error}
				</div>
			)}

			<div
				className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
				data-testid={testId}
			>
				{products.map((product) => (
					<div
						key={product.id}
						className="overflow-hidden rounded-lg border border-accent bg-card shadow-sm transition-shadow hover:shadow-md"
						data-testid={`${testId}-${product.id}`}
					>
						<div className="relative h-48 w-full">
							{product.imageUrl && (
								<Image
									src={product.imageUrl}
									alt={product.title}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									className="object-cover"
								/>
							)}
						</div>
						<div className="p-4">
							<h3 className="text-lg font-semibold">
								{product.title}
							</h3>
							<p className="mb-2 text-sm text-gray-500">
								{product.categories
									.map((cat) => cat.toLowerCase())
									.join(", ")}
							</p>
							{product?.subcategories && (
								<p className="mb-2 text-sm text-gray-500">
									{product.subcategories
										.map((sub) => sub.toLowerCase())
										.join(", ")}
								</p>
							)}
							<p className="text-lg font-bold">
								${product.price.toFixed(2)}
							</p>

							{product.isReported && (
								<div className="mt-2 inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
									Reported ({product.reportCount})
								</div>
							)}

							<div className="mt-4 flex space-x-2">
								<Link
									href={`/products/edit/${product.id}`}
									variant="secondary"
									size="sm"
								>
									Edit
								</Link>
								<Button
									onClick={() => handleDelete(product.id)}
									disabled={isDeleting === product.id}
									variant="destructive"
									size="sm"
								>
									{isDeleting === product.id
										? "Deleting..."
										: "Delete"}
								</Button>
								<Link
									href={`/products/${product.id}`}
									variant="primary"
									size="sm"
								>
									View
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
