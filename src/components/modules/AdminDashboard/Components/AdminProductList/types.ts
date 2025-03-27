import { BaseProps } from "@/components/utils/types";

type ProductProps = {
	id: string;
	title: string;
	imageUrl: string;
	createdAt: string;
	price: number;
	createdBy: string;
	isReported: boolean;
};

export type AdminProductListProps = BaseProps & {
	products: ProductProps[];
	currentPage: number;
	totalPages: number;
	isReportedView: boolean;
};
