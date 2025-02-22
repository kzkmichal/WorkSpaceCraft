import { BaseProps } from "@/components/utils/types";

export type SubcategoryProps = BaseProps & {
	title?: string;
	desc?: string;
};

export type CategoryProps = BaseProps & {
	title?: string;
	desc?: string;
	image?: string;
	subcategories?: SubcategoryProps[];
};
