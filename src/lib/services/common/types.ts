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

export type CompleteProduct = Product & {
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

export type CompleteSetupProduct = SetupProduct & {
	product: CompleteProduct;
};

export type CompleteSetup = Setup & {
	user: User;
	products: CompleteSetupProduct[];
};

export type SetupWithUser = Setup & {
	user: User;
};

export type WithTimestamps = {
	createdAt: Date;
	updatedAt: Date;
};

export type FormattableEntity<T> = T & WithTimestamps;

export type SearchProduct = Product & {
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
};

export type CompleteSubcategory = Subcategory & {
	products: (ProductToSubcategory & {
		product: CompleteProduct;
	})[];
};

export type CompleteTag = Tag & {
	products: (ProductToTag & {
		product: CompleteProduct;
	})[];
};
