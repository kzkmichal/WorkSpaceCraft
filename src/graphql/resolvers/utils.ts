import {
	formatUser as formatUserUtil,
	formatDates,
} from "@/lib/services/common/formatter-utils";
import {
	CompleteProduct,
	SearchProduct,
} from "@/lib/services/common/types";

export const formatUser = formatUserUtil;

export const formatProduct = (
	product: SearchProduct | CompleteProduct,
) => {
	const baseFormatting = {
		...product,
		...formatDates(product),
		brand: product.brand || undefined,
		model: product.model || undefined,
		categories:
			product.categories?.map((pc) => pc.categoryType) || [],
		subcategories:
			product.subcategories?.map((ps) => ({
				...ps.subcategory,
				...formatDates(ps.subcategory),
				description: ps.subcategory.description || undefined,
			})) || [],
		images:
			product.images?.map((image) => ({
				...image,
				...formatDates(image),
				fileName: image.fileName || undefined,
			})) || [],
		tags:
			product.tags?.map((pt) => ({
				...pt.tag,
				...formatDates(pt.tag),
			})) || [],
		reportReason: product.reportReason ?? undefined,
		moderatedBy: product.moderatedBy ?? undefined,
		moderatedAt: product.moderatedAt?.toISOString() ?? undefined,
		createdBy: formatUser(product.createdBy),
	};

	if (
		"dimensions" in product &&
		"technicalFeatures" in product &&
		"prosCons" in product
	) {
		return {
			...baseFormatting,
			dimensions:
				product.dimensions?.map((d) => ({
					id: d.id,
					name: d.name,
					value: d.value,
					unit: d.unit || undefined,
				})) || [],
			technicalFeatures:
				product.technicalFeatures?.map((f) => ({
					id: f.id,
					name: f.name,
					value: f.value,
				})) || [],
			pros:
				product.prosCons
					?.filter((pc) => pc.type === "PROS")
					.map((pc) => ({
						id: pc.id,
						text: pc.text,
						type: pc.type,
					})) || [],
			cons:
				product.prosCons
					?.filter((pc) => pc.type === "CONS")
					.map((pc) => ({
						id: pc.id,
						text: pc.text,
						type: pc.type,
					})) || [],
			userExperience: product.userExperience
				? {
						...formatDates(product.userExperience),
						id: product.userExperience.id,
						setupDifficulty: product.userExperience.setupDifficulty,
						assemblyRequired: product.userExperience.assemblyRequired,
						toolsNeeded: product.userExperience.toolsNeeded,
						compatibility: product.userExperience.compatibility,
						userManualLink:
							product.userExperience.userManualLink || undefined,
					}
				: undefined,
		};
	}

	return baseFormatting;
};
