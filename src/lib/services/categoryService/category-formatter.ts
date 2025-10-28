import { formatDates, formatUser } from "../common/formatter-utils";
import { ProductFormatter } from "../productService/product-formatter";
import {
	CompleteProduct,
	CompleteSubcategory,
} from "../common/types";
import { CategoryType } from "@/graphql/generated/graphql";

export class CategoryFormatter {
	static formatCategory(category: {
		type: string;
		name: string;
		slug: string;
		subcategories: CompleteSubcategory[];
		products: CompleteProduct[];
	}) {
		return {
			...category,
			type: category.type as CategoryType,
			subcategories: category.subcategories.map((subcategory) =>
				this.formatSubcategoryWithProducts(subcategory),
			),
			products: category.products.map((product) =>
				ProductFormatter.formatProduct(product),
			),
		};
	}

	static formatSubcategoryWithProducts(
		subcategory: CompleteSubcategory,
	) {
		return {
			...subcategory,
			...formatDates(subcategory),
			description: subcategory.description || undefined,
			products: subcategory.products.map((sp) =>
				ProductFormatter.formatProduct(sp.product),
			),
		};
	}
}
