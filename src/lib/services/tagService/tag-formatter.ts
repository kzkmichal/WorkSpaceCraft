import { Tag } from "@prisma/client";
import { formatDates, formatUser } from "../common/formatter-utils";
import { CompleteTag, CompleteProduct } from "../common/types";

export class TagFormatter {
	static formatTag(tag: Tag) {
		return {
			...tag,
			...formatDates(tag),
		};
	}

	static formatTagWithCount(tag: Tag, count: number) {
		return {
			...tag,
			...formatDates(tag),
			count,
		};
	}

	static formatTagWithProducts(tag: CompleteTag) {
		return {
			...tag,
			...formatDates(tag),
			products: tag.products.map((pt) =>
				this.formatProductForTag(pt.product),
			),
		};
	}

	static formatProductForTag(product: CompleteProduct) {
		return {
			...product,
			...formatDates(product),
			reportReason: product.reportReason || undefined,
			images: product.images.map((image) => ({
				...image,
				...formatDates(image),
				fileName: image.fileName || undefined,
			})),
			createdBy: formatUser(product.createdBy),
			categories: product.categories.map((pc) => pc.categoryType),
			subcategories: product.subcategories.map((ps) => ({
				...ps.subcategory,
				...formatDates(ps.subcategory),
				description: ps.subcategory.description || undefined,
			})),
			tags: product.tags.map((pt) => ({
				...pt.tag,
				...formatDates(pt.tag),
			})),
		};
	}
}
