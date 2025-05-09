import { notFound } from "next/navigation";
import { getProduct } from "@/hooks/getProduct";
import { Product } from "@/components/modules";

type ProductProps = {
	params: Promise<{
		id: string;
	}>;
};

export default async function ProductPage(props: ProductProps) {
	const params = await props.params;

	const product = await getProduct(params.id);

	if (!product) {
		notFound();
	}

	return <Product {...product} />;
}
