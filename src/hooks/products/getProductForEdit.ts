import { getClient } from "@/lib/apollo-server";
import {
	ProductDocument,
	ProductQuery,
	ProductQueryVariables,
} from "@/graphql/generated/graphql";

export async function getProductForEdit(id: string) {
	const client = await getClient();
	const { data } = await client.query<
		ProductQuery,
		ProductQueryVariables
	>({
		query: ProductDocument,
		variables: { id },
	});

	const { product } = data;

	if (!product) return undefined;

	return {
		id: product.id,
		userId: product.createdBy.id,
		title: product.title,
		brand: product.brand,
		model: product.model || "",
		description: product.description,
		price: product.price,
		originalStoreLink: product.originalStoreLink,
		categoryTypes: product.categories.map((pc) => pc),
		images:
			product.images
				?.filter((image) => image != null)
				.map((image) => ({
					id: image.id,
					url: image.url || "",
					fileName: image.fileName || "",
					isPrimary: image.isPrimary || false,
				})) || [],
		tags:
			product.tags?.map((tag) => ({
				id: tag.id,
				name: tag.name,
			})) || [],
		subcategoryIds: product.subcategories
			? product.subcategories.map((ps) => ps?.id || "")
			: [],
		dimensions:
			product.dimensions?.map((dim) => ({
				id: dim.id,
				name: dim.name,
				value: dim.value,
			})) || [],
		technicalFeatures: product.technicalFeatures?.map((feature) => ({
			id: feature.id,
			name: feature.name,
			value: feature.value,
		})),
		pros: product.pros
			? product.pros.map((pro) => ({
					id: pro.id,
					text: pro.text,
				}))
			: [],
		cons: product.cons
			? product.cons.map((con) => ({
					id: con.id,
					text: con.text,
				}))
			: [],
		userExperience: product.userExperience
			? {
					id: product.userExperience.id,
					setupDifficulty: product.userExperience.setupDifficulty,
					assemblyRequired: product.userExperience.assemblyRequired,
					toolsNeeded: product.userExperience.toolsNeeded,
					compatibility: product.userExperience.compatibility,
					userManualLink: product.userExperience.userManualLink || "",
				}
			: undefined,
	};
}
