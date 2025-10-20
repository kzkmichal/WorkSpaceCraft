import { BaseProps } from "@/components/utils/types";
import { CategoryType } from "@/graphql/generated/graphql";

type ProductProps = {
	id: string;
	title: string;
	price: number;
	imageUrl?: string;
	categories: CategoryType[];
	subcategories?: string[];
	isReported: boolean;
	reportCount: number;
	userId: string;
};

export type UserProductsProps = BaseProps & {
	products: ProductProps[];
};
