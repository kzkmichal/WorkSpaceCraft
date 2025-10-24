import { Subcategory } from "@prisma/client";
import { formatDates } from "../common/formatter-utils";
import { ProductFormatter } from "../productService/product-formatter";
import { CompleteSubcategory } from "../common/types";

export class SubcategoryFormatter {
	static formatSubcategory(subcategory: Subcategory) {
		return {
			...subcategory,
			...formatDates(subcategory),
			description: subcategory.description || undefined,
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
