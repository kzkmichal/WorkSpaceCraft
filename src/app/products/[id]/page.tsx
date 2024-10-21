import { notFound } from "next/navigation";

export default function ProductPage({
	params,
}: {
	params: { id: string };
}) {
	// TODO: Fetch product data based on params.id
	const product = null; // Replace with actual data fetching

	if (!product) {
		notFound();
	}

	return (
		<div>
			<h1 className="mb-6 text-3xl font-bold">Product Details</h1>
			{/* TODO: Add product details */}
		</div>
	);
}
