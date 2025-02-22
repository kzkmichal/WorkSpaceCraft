import { BaseProps } from "@/components/utils/types";

export type CategoryProps = {
	name?: string;
	image?: string;
	slug?: string;
	desc?: string;
};

export type CategoriesProps = BaseProps & {
	categories?: CategoryProps[];
};
