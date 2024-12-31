import { notFound } from "next/navigation";
import { getProduct } from "@/hooks/getProduct";
import { ProductDetails } from "@/components/products/ProductDetails";

export default async function ProductPage({
	params,
}: {
	params: { id: string };
}) {
	const product = await getProduct(params.id);

	if (!product) {
		notFound();
	}

	return <ProductDetails {...product} />;
}
