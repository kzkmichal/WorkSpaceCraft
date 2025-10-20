import {
	Subcategory,
	Tag,
	ProductDimension,
	ProductTechnicalFeature,
	ProductProCon,
	ProductUserExperience,
} from "@prisma/client";
import { formatDates, formatUser } from "../common/formatter-utils";
import { CompleteProduct } from "../common/types";

export const formatSubcategory = (subcategory: Subcategory) => ({
	...subcategory,
	...formatDates(subcategory),
	description: subcategory.description || undefined,
});

const formatTag = (tag: Tag) => ({
	...tag,
	createdAt: tag.createdAt.toISOString(),
	updatedAt: tag.updatedAt.toISOString(),
});

const formatDimension = (dimension: ProductDimension) => ({
	id: dimension.id,
	name: dimension.name,
	value: dimension.value,
	unit: dimension.unit || undefined,
});

const formatTechnicalFeature = (
	feature: ProductTechnicalFeature,
) => ({
	id: feature.id,
	name: feature.name,
	value: feature.value,
});

const formatProCon = (proCon: ProductProCon) => ({
	id: proCon.id,
	text: proCon.text,
	type: proCon.type,
});

const formatUserExperience = (userExp: ProductUserExperience) => ({
	...formatDates(userExp),
	id: userExp.id,
	setupDifficulty: userExp.setupDifficulty,
	assemblyRequired: userExp.assemblyRequired,
	toolsNeeded: userExp.toolsNeeded,
	compatibility: userExp.compatibility,
	userManualLink: userExp.userManualLink || undefined,
});

export class ProductFormatter {
	static formatProduct(product: CompleteProduct) {
		return {
			...product,
			...formatDates(product),
			brand: product.brand || undefined,
			model: product.model || undefined,
			categories:
				product.categories?.map((pc) => pc.categoryType) || [],
			subcategories:
				product.subcategories?.map((ps) =>
					formatSubcategory(ps.subcategory),
				) || [],
			images:
				product.images?.map((image) => ({
					...image,
					...formatDates(image),
					fileName: image.fileName || undefined,
				})) || [],
			tags:
				product.tags?.map((pt) => ({
					...formatTag(pt.tag),
				})) || [],
			dimensions: product.dimensions?.map(formatDimension) || [],
			technicalFeatures:
				product.technicalFeatures?.map(formatTechnicalFeature) || [],
			pros:
				product.prosCons
					?.filter((pc) => pc.type === "PROS")
					.map(formatProCon) || [],
			cons:
				product.prosCons
					?.filter((pc) => pc.type === "CONS")
					.map(formatProCon) || [],
			userExperience: product.userExperience
				? formatUserExperience(product.userExperience)
				: undefined,
			reportReason: product.reportReason ?? undefined,
			moderatedBy: product.moderatedBy ?? undefined,
			moderatedAt: product.moderatedAt?.toISOString() ?? undefined,
			createdBy: formatUser(product.createdBy),
		};
	}

	/**
	 * Format individual product dimension
	 */
	static formatDimension(dimension: ProductDimension) {
		return formatDimension(dimension);
	}

	/**
	 * Format individual technical feature
	 */
	static formatTechnicalFeature(feature: ProductTechnicalFeature) {
		return formatTechnicalFeature(feature);
	}

	/**
	 * Format individual pro/con
	 */
	static formatProCon(proCon: ProductProCon) {
		return formatProCon(proCon);
	}

	/**
	 * Format user experience
	 */
	static formatUserExperience(userExp: ProductUserExperience) {
		return formatUserExperience(userExp);
	}

	/**
	 * Format subcategory
	 */
	static formatSubcategory(subcategory: Subcategory) {
		return formatSubcategory(subcategory);
	}

	/**
	 * Format tag
	 */
	static formatTag(tag: Tag) {
		return formatTag(tag);
	}
}
