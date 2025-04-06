import { CategoryType } from "@prisma/client";
import { BaseProps } from "@/components/utils/types";
import { ProductFormValues } from "@/lib/validations/product";

export type CategoryInfo = {
	type: CategoryType;
	name: string;
	subcategories: Array<{
		id: string;
		name: string;
		slug: string;
		fullSlug: string;
		categoryType: string;
	}>;
};

export type ProductValues = {
	id?: string;
	title: string;
	description: string;
	price: number;
	imageUrl: string;
	originalStoreLink: string;
	categoryTypes: string[];
	subcategoryIds: string[];
};

export type ProductFormProps = BaseProps & {
	categories: CategoryInfo[];
	product?: ProductFormValues & { id?: string };
	isEditing?: boolean;
};
