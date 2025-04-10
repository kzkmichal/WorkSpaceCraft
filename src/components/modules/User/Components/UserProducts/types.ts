import { BaseProps } from "@/components/utils/types";

type ProductProps = {
	id: string;
	title: string;
	price: number;
	imageUrl?: string;
	categories: string[];
	subcategories?: string[];
	isReported: boolean;
	reportCount: number;
};

export type UserProductsProps = BaseProps & {
	products: ProductProps[];
};
