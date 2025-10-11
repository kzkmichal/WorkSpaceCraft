import {
	Product,
	Subcategory,
	Setup,
	SetupProduct,
	User,
	Tag,
	ProductDimension,
	ProductTechnicalFeature,
	ProductProCon,
	ProductUserExperience,
	ProductImage,
	ProductToTag,
	ProductToCategory,
	ProductToSubcategory,
} from "@prisma/client";

type CompleteSetupProduct = SetupProduct & {
	product: CompleteProduct;
};

type CompleteSetup = Setup & {
	user: User;
	products: CompleteSetupProduct[];
};

type SetupType = Setup & {
	user: User;
};

export const formatDates = <
	T extends {
		createdAt: Date;
		updatedAt: Date;
	},
>(
	obj: T,
) => ({
	...obj,
	createdAt: obj.createdAt.toISOString(),
	updatedAt: obj.updatedAt.toISOString(),
});

export const formatUserSetups = (setups: SetupType[]) =>
	setups.map((setup) => ({
		...setup,
		...formatDates(setup),
		description: setup.description || undefined,
		imageUrl: setup.imageUrl || undefined,
		user: formatUser(setup.user),
		products: [],
	}));

export const formatSetup = (setup: CompleteSetup) => ({
	...setup,
	...formatDates(setup),
	description: setup.description || undefined,
	imageUrl: setup.imageUrl || undefined,
	user: formatUser(setup.user),
	products: setup.products.map((sp) => ({
		...formatSetupProduct(sp),
		product: formatProduct(sp.product),
	})),
});

export const formatSetupProduct = (setupProduct: SetupProduct) => ({
	id: setupProduct.id,
	setupId: setupProduct.setupId,
	productId: setupProduct.productId,
	order: setupProduct.order,
	createdAt: setupProduct.createdAt.toISOString(),
});

type CompleteProduct = Product & {
	createdBy: User;
	categories: ProductToCategory[];
	subcategories: (ProductToSubcategory & {
		subcategory: Subcategory;
	})[];
	images: ProductImage[];
	tags: (ProductToTag & {
		tag: Tag;
	})[];
	reviews?: any[];
	dimensions: ProductDimension[];
	technicalFeatures: ProductTechnicalFeature[];
	prosCons: ProductProCon[];
	userExperience: ProductUserExperience | null;
};

export const formatProduct = (product: CompleteProduct) => ({
	...product,
	...formatDates(product),
	brand: product.brand || undefined,
	model: product.model || undefined,
	categories: product.categories?.map((pc) => pc.categoryType) || [],
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
});

export const formatDimension = (dimension: ProductDimension) => ({
	id: dimension.id,
	name: dimension.name,
	value: dimension.value,
	unit: dimension.unit || undefined,
});

export const formatTechnicalFeature = (
	feature: ProductTechnicalFeature,
) => ({
	id: feature.id,
	name: feature.name,
	value: feature.value,
});

export const formatProCon = (proCon: ProductProCon) => ({
	id: proCon.id,
	text: proCon.text,
	type: proCon.type,
});

export const formatUserExperience = (
	userExp: ProductUserExperience,
) => ({
	...formatDates(userExp),
	id: userExp.id,
	setupDifficulty: userExp.setupDifficulty,
	assemblyRequired: userExp.assemblyRequired,
	toolsNeeded: userExp.toolsNeeded,
	compatibility: userExp.compatibility,
	userManualLink: userExp.userManualLink || undefined,
});

export const formatSubcategory = (subcategory: Subcategory) => ({
	...subcategory,
	...formatDates(subcategory),
	description: subcategory.description || undefined,
});

export const formatUser = (user: User) => ({
	...user,
	...formatDates(user),
	emailVerified: user.emailVerified?.toISOString() ?? undefined,
	image: user.image ?? undefined,
	role: user.role as "USER" | "ADMIN",
	bio: user.bio ?? undefined,
});

export const formatTag = (
	tag: Tag & {
		// products?: { product: Product }[];
	},
) => ({
	...tag,
	createdAt: tag.createdAt.toISOString(),
	updatedAt: tag.updatedAt.toISOString(),
	// products: tag.products
	// 	? tag.products.map((pt) => formatProduct(pt.product))
	// 	: undefined,
});
