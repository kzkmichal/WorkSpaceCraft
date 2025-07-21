import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { ApolloContext } from '../context';
import gql from 'graphql-tag';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type AuthResult = {
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type CategoryInfo = {
  description?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
  slug: Scalars['String']['output'];
  subcategories?: Maybe<Array<Maybe<Subcategory>>>;
  type: CategoryType;
};

export type CategoryType =
  | 'HOME'
  | 'OFFICE'
  | 'REMOTE';

export type ChangePasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type CreateProductInput = {
  categoryTypes: Array<CategoryType>;
  description: Scalars['String']['input'];
  newTags?: InputMaybe<Array<Scalars['String']['input']>>;
  originalStoreLink: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  subcategoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  tagIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateSubcategoryInput = {
  categoryType: CategoryType;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type Mutation = {
  addProductCategories: Product;
  addProductSubcategories: Product;
  addTagToProduct: Product;
  changePassword?: Maybe<AuthResult>;
  createProduct: Product;
  createSubcategory: Subcategory;
  deleteProduct: Scalars['Boolean']['output'];
  deleteSubcategory: Scalars['Boolean']['output'];
  moderateProduct: Product;
  removeProductCategories: Product;
  removeProductSubcategories: Product;
  removeTagFromProduct: Product;
  reportProduct: Product;
  updateProduct: Product;
  updateSubcategory: Subcategory;
  updateUserProfile?: Maybe<User>;
  updateUserRole: User;
};


export type MutationAddProductCategoriesArgs = {
  categoryTypes: Array<CategoryType>;
  productId: Scalars['ID']['input'];
};


export type MutationAddProductSubcategoriesArgs = {
  productId: Scalars['ID']['input'];
  subcategoryIds: Array<Scalars['ID']['input']>;
};


export type MutationAddTagToProductArgs = {
  productId: Scalars['ID']['input'];
  tagInput: TagInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateSubcategoryArgs = {
  input: CreateSubcategoryInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSubcategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationModerateProductArgs = {
  action: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveProductCategoriesArgs = {
  categoryTypes: Array<CategoryType>;
  productId: Scalars['ID']['input'];
};


export type MutationRemoveProductSubcategoriesArgs = {
  productId: Scalars['ID']['input'];
  subcategoryIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveTagFromProductArgs = {
  productId: Scalars['ID']['input'];
  tagId: Scalars['ID']['input'];
};


export type MutationReportProductArgs = {
  productId: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};


export type MutationUpdateSubcategoryArgs = {
  input: UpdateSubcategoryInput;
};


export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
};


export type MutationUpdateUserRoleArgs = {
  role: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type Product = {
  categories: Array<CategoryType>;
  createdAt: Scalars['String']['output'];
  createdBy: User;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Maybe<ProductImage>>>;
  isReported?: Maybe<Scalars['Boolean']['output']>;
  originalStoreLink: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  reportCount?: Maybe<Scalars['Int']['output']>;
  reportReason?: Maybe<Scalars['String']['output']>;
  reviews?: Maybe<Array<Maybe<Review>>>;
  subcategories?: Maybe<Array<Maybe<Subcategory>>>;
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type ProductImage = {
  fileName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isPrimary?: Maybe<Scalars['Boolean']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  allUsers: Array<User>;
  categories: Array<CategoryInfo>;
  categoryByType: CategoryInfo;
  categoryProducts: Array<Product>;
  categorySubcategories: Array<Subcategory>;
  me?: Maybe<User>;
  myProducts: Array<Product>;
  popularTags: Array<Tag>;
  product?: Maybe<Product>;
  products: Array<Product>;
  productsByTag: Array<Product>;
  reportedProducts: Array<Product>;
  session?: Maybe<Session>;
  subcategories: Array<Subcategory>;
  subcategory?: Maybe<Subcategory>;
  tag?: Maybe<Tag>;
  tags?: Maybe<Array<Tag>>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryAllUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCategoryByTypeArgs = {
  type: CategoryType;
};


export type QueryCategoryProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  subcategoryId?: InputMaybe<Scalars['ID']['input']>;
  type: CategoryType;
};


export type QueryCategorySubcategoriesArgs = {
  type: CategoryType;
};


export type QueryPopularTagsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductsArgs = {
  categoryType?: InputMaybe<CategoryType>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  subcategoryFullSlug?: InputMaybe<Scalars['String']['input']>;
  tagSlugs?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryProductsByTagArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tagSlug: Scalars['String']['input'];
};


export type QueryReportedProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySubcategoriesArgs = {
  categoryType?: InputMaybe<CategoryType>;
};


export type QuerySubcategoryArgs = {
  fullSlug: Scalars['String']['input'];
};


export type QueryTagArgs = {
  slug: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Review = {
  comment: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  product: Product;
  rating: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type Role =
  | 'ADMIN'
  | 'USER';

export type Session = {
  expires?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Subcategory = {
  categoryType: CategoryType;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  fullSlug: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Tag = {
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products?: Maybe<Array<Product>>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type TagInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
};

export type UpdateProductInput = {
  categoryTypes?: InputMaybe<Array<CategoryType>>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  newTags?: InputMaybe<Array<Scalars['String']['input']>>;
  originalStoreLink?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  subcategoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  tagIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSubcategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserProfileInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Product>>;
  reviews?: Maybe<Array<Review>>;
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthResult: ResolverTypeWrapper<AuthResult>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CategoryInfo: ResolverTypeWrapper<CategoryInfo>;
  CategoryType: CategoryType;
  ChangePasswordInput: ChangePasswordInput;
  CreateProductInput: CreateProductInput;
  CreateSubcategoryInput: CreateSubcategoryInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Product: ResolverTypeWrapper<Product>;
  ProductImage: ResolverTypeWrapper<ProductImage>;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  Role: Role;
  Session: ResolverTypeWrapper<Session>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subcategory: ResolverTypeWrapper<Subcategory>;
  Tag: ResolverTypeWrapper<Tag>;
  TagInput: TagInput;
  UpdateProductInput: UpdateProductInput;
  UpdateSubcategoryInput: UpdateSubcategoryInput;
  UpdateUserProfileInput: UpdateUserProfileInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthResult: AuthResult;
  Boolean: Scalars['Boolean']['output'];
  CategoryInfo: CategoryInfo;
  ChangePasswordInput: ChangePasswordInput;
  CreateProductInput: CreateProductInput;
  CreateSubcategoryInput: CreateSubcategoryInput;
  DateTime: Scalars['DateTime']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Product: Product;
  ProductImage: ProductImage;
  Query: {};
  Review: Review;
  Session: Session;
  String: Scalars['String']['output'];
  Subcategory: Subcategory;
  Tag: Tag;
  TagInput: TagInput;
  UpdateProductInput: UpdateProductInput;
  UpdateSubcategoryInput: UpdateSubcategoryInput;
  UpdateUserProfileInput: UpdateUserProfileInput;
  User: User;
};

export type AuthResultResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['AuthResult'] = ResolversParentTypes['AuthResult']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryInfoResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['CategoryInfo'] = ResolversParentTypes['CategoryInfo']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subcategories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Subcategory']>>>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['CategoryType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addProductCategories?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationAddProductCategoriesArgs, 'categoryTypes' | 'productId'>>;
  addProductSubcategories?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationAddProductSubcategoriesArgs, 'productId' | 'subcategoryIds'>>;
  addTagToProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationAddTagToProductArgs, 'productId' | 'tagInput'>>;
  changePassword?: Resolver<Maybe<ResolversTypes['AuthResult']>, ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'input'>>;
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'input'>>;
  createSubcategory?: Resolver<ResolversTypes['Subcategory'], ParentType, ContextType, RequireFields<MutationCreateSubcategoryArgs, 'input'>>;
  deleteProduct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>;
  deleteSubcategory?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteSubcategoryArgs, 'id'>>;
  moderateProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationModerateProductArgs, 'action' | 'productId'>>;
  removeProductCategories?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationRemoveProductCategoriesArgs, 'categoryTypes' | 'productId'>>;
  removeProductSubcategories?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationRemoveProductSubcategoriesArgs, 'productId' | 'subcategoryIds'>>;
  removeTagFromProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationRemoveTagFromProductArgs, 'productId' | 'tagId'>>;
  reportProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationReportProductArgs, 'productId' | 'reason'>>;
  updateProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'input'>>;
  updateSubcategory?: Resolver<ResolversTypes['Subcategory'], ParentType, ContextType, RequireFields<MutationUpdateSubcategoryArgs, 'input'>>;
  updateUserProfile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserProfileArgs, 'input'>>;
  updateUserRole?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserRoleArgs, 'role' | 'userId'>>;
};

export type ProductResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  categories?: Resolver<Array<ResolversTypes['CategoryType']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductImage']>>>, ParentType, ContextType>;
  isReported?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  originalStoreLink?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reportCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  reportReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<Maybe<ResolversTypes['Review']>>>, ParentType, ContextType>;
  subcategories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Subcategory']>>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductImageResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ProductImage'] = ResolversParentTypes['ProductImage']> = {
  fileName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isPrimary?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryAllUsersArgs>>;
  categories?: Resolver<Array<ResolversTypes['CategoryInfo']>, ParentType, ContextType>;
  categoryByType?: Resolver<ResolversTypes['CategoryInfo'], ParentType, ContextType, RequireFields<QueryCategoryByTypeArgs, 'type'>>;
  categoryProducts?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryCategoryProductsArgs, 'type'>>;
  categorySubcategories?: Resolver<Array<ResolversTypes['Subcategory']>, ParentType, ContextType, RequireFields<QueryCategorySubcategoriesArgs, 'type'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  myProducts?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  popularTags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, Partial<QueryPopularTagsArgs>>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, Partial<QueryProductsArgs>>;
  productsByTag?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductsByTagArgs, 'tagSlug'>>;
  reportedProducts?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, Partial<QueryReportedProductsArgs>>;
  session?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType>;
  subcategories?: Resolver<Array<ResolversTypes['Subcategory']>, ParentType, ContextType, Partial<QuerySubcategoriesArgs>>;
  subcategory?: Resolver<Maybe<ResolversTypes['Subcategory']>, ParentType, ContextType, RequireFields<QuerySubcategoryArgs, 'fullSlug'>>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagArgs, 'slug'>>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type ReviewResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SessionResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = {
  expires?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubcategoryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Subcategory'] = ResolversParentTypes['Subcategory']> = {
  categoryType?: Resolver<ResolversTypes['CategoryType'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullSlug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailVerified?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ApolloContext> = {
  AuthResult?: AuthResultResolvers<ContextType>;
  CategoryInfo?: CategoryInfoResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductImage?: ProductImageResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  Subcategory?: SubcategoryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


export type UserFieldsFragment = { id: string, name?: string | undefined, email: string, image?: string | undefined, role: Role, bio?: string | undefined, createdAt: string, updatedAt: string };

export type SessionFieldsFragment = { expires?: string | undefined, user?: { id: string, name?: string | undefined, email: string, image?: string | undefined, role: Role, bio?: string | undefined, createdAt: string, updatedAt: string } | undefined };

export type AuthResultFieldsFragment = { success: boolean, message?: string | undefined, user?: { id: string, name?: string | undefined, email: string, image?: string | undefined, role: Role, bio?: string | undefined, createdAt: string, updatedAt: string } | undefined };

export type CategoryFieldsFragment = { name: string, slug: string, description?: string | undefined, imageUrl?: string | undefined, type: CategoryType, products?: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } | undefined> | undefined, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } | undefined> | undefined } | undefined> | undefined };

export type UserFragment = { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role };

export type ProductImageFragment = { id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined };

export type ProductFieldsFragment = { id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined };

export type SubcategoryFieldsFragment = { id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } | undefined> | undefined };

export type TagFieldsFragment = { id: string, name: string, slug: string, createdAt: string, updatedAt: string };

export type UpdateUserProfileMutationVariables = Exact<{
  input: UpdateUserProfileInput;
}>;


export type UpdateUserProfileMutation = { updateUserProfile?: { id: string, name?: string | undefined, email: string, image?: string | undefined, role: Role, bio?: string | undefined, createdAt: string, updatedAt: string } | undefined };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { changePassword?: { success: boolean, message?: string | undefined } | undefined };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { createProduct: { id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } };

export type UpdateProductMutationVariables = Exact<{
  input: UpdateProductInput;
}>;


export type UpdateProductMutation = { updateProduct: { id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProductMutation = { deleteProduct: boolean };

export type AddProductCategoriesMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  categoryTypes: Array<CategoryType> | CategoryType;
}>;


export type AddProductCategoriesMutation = { addProductCategories: { id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } };

export type RemoveProductCategoriesMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  categoryTypes: Array<CategoryType> | CategoryType;
}>;


export type RemoveProductCategoriesMutation = { removeProductCategories: { id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } };

export type CreateSubcategoryMutationVariables = Exact<{
  input: CreateSubcategoryInput;
}>;


export type CreateSubcategoryMutation = { createSubcategory: { id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } | undefined> | undefined } };

export type UpdateSubcategoryMutationVariables = Exact<{
  input: UpdateSubcategoryInput;
}>;


export type UpdateSubcategoryMutation = { updateSubcategory: { id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } | undefined> | undefined } };

export type DeleteSubcategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSubcategoryMutation = { deleteSubcategory: boolean };

export type AddProductSubcategoriesMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  subcategoryIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type AddProductSubcategoriesMutation = { addProductSubcategories: { id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } };

export type RemoveProductSubcategoriesMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  subcategoryIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type RemoveProductSubcategoriesMutation = { removeProductSubcategories: { id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } };

export type AddTagToProductMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  tagInput: TagInput;
}>;


export type AddTagToProductMutation = { addTagToProduct: { id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined } };

export type RemoveTagFromProductMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  tagId: Scalars['ID']['input'];
}>;


export type RemoveTagFromProductMutation = { removeTagFromProduct: { id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me?: { id: string, name?: string | undefined, email: string, image?: string | undefined, role: Role, bio?: string | undefined, createdAt: string, updatedAt: string } | undefined };

export type GetSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionQuery = { session?: { expires?: string | undefined, user?: { id: string, name?: string | undefined, email: string, image?: string | undefined, role: Role, bio?: string | undefined, createdAt: string, updatedAt: string } | undefined } | undefined };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { categories: Array<{ name: string, slug: string, description?: string | undefined, imageUrl?: string | undefined, type: CategoryType, products?: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } | undefined> | undefined, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } | undefined> | undefined } | undefined> | undefined }> };

export type CategoryByTypeQueryVariables = Exact<{
  type: CategoryType;
}>;


export type CategoryByTypeQuery = { categoryByType: { name: string, slug: string, description?: string | undefined, imageUrl?: string | undefined, type: CategoryType, products?: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } | undefined> | undefined, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } | undefined> | undefined } | undefined> | undefined } };

export type CategoryProductsQueryVariables = Exact<{
  type: CategoryType;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  subcategoryId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CategoryProductsQuery = { categoryProducts: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined }> };

export type CategorySubcategoriesQueryVariables = Exact<{
  type: CategoryType;
}>;


export type CategorySubcategoriesQuery = { categorySubcategories: Array<{ id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } | undefined> | undefined }> };

export type ProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tagSlugs?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type ProductsQuery = { products: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined }> };

export type ProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProductQuery = { product?: { id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } | undefined };

export type ReportedProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tagSlug?: InputMaybe<Scalars['String']['input']>;
}>;


export type ReportedProductsQuery = { reportedProducts: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined }> };

export type MyProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProductsQuery = { myProducts: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined }> };

export type SubcategoriesQueryVariables = Exact<{
  categoryType: CategoryType;
}>;


export type SubcategoriesQuery = { subcategories: Array<{ id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } | undefined> | undefined }> };

export type SubcategoryQueryVariables = Exact<{
  fullSlug: Scalars['String']['input'];
}>;


export type SubcategoryQuery = { subcategory?: { id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined } | undefined> | undefined } | undefined };

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = { tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined };

export type PopularTagsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PopularTagsQuery = { popularTags: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> };

export type TagQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type TagQuery = { tag?: { id: string, name: string, slug: string, createdAt: string, updatedAt: string } | undefined };

export type ProductsByTagQueryVariables = Exact<{
  tagSlug: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProductsByTagQuery = { productsByTag: Array<{ id: string, title: string, description: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, isReported?: boolean | undefined, reportCount?: number | undefined, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string, role: Role }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined, images?: Array<{ id: string, url?: string | undefined, fileName?: string | undefined, isPrimary?: boolean | undefined } | undefined> | undefined, tags?: Array<{ id: string, name: string, slug: string, createdAt: string, updatedAt: string }> | undefined }> };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  name
  email
  image
  role
  bio
  createdAt
  updatedAt
}
    `;
export const SessionFieldsFragmentDoc = gql`
    fragment SessionFields on Session {
  user {
    ...UserFields
  }
  expires
}
    ${UserFieldsFragmentDoc}`;
export const AuthResultFieldsFragmentDoc = gql`
    fragment AuthResultFields on AuthResult {
  success
  message
  user {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  name
  email
  createdAt
  updatedAt
  role
}
    `;
export const ProductImageFragmentDoc = gql`
    fragment ProductImage on ProductImage {
  id
  url
  fileName
  isPrimary
}
    `;
export const TagFieldsFragmentDoc = gql`
    fragment TagFields on Tag {
  id
  name
  slug
  createdAt
  updatedAt
}
    `;
export const ProductFieldsFragmentDoc = gql`
    fragment ProductFields on Product {
  id
  title
  description
  price
  originalStoreLink
  createdAt
  updatedAt
  createdBy {
    ...User
  }
  categories
  isReported
  reportCount
  subcategories {
    id
    name
    slug
    fullSlug
    categoryType
  }
  images {
    ...ProductImage
  }
  tags {
    ...TagFields
  }
}
    ${UserFragmentDoc}
${ProductImageFragmentDoc}
${TagFieldsFragmentDoc}`;
export const SubcategoryFieldsFragmentDoc = gql`
    fragment SubcategoryFields on Subcategory {
  id
  name
  slug
  fullSlug
  description
  categoryType
  products {
    ...ProductFields
  }
  createdAt
  updatedAt
}
    ${ProductFieldsFragmentDoc}`;
export const CategoryFieldsFragmentDoc = gql`
    fragment CategoryFields on CategoryInfo {
  name
  slug
  description
  imageUrl
  type
  products {
    ...ProductFields
  }
  subcategories {
    ...SubcategoryFields
  }
}
    ${ProductFieldsFragmentDoc}
${SubcategoryFieldsFragmentDoc}`;
export const UpdateUserProfileDocument = gql`
    mutation UpdateUserProfile($input: UpdateUserProfileInput!) {
  updateUserProfile(input: $input) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    success
    message
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id)
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const AddProductCategoriesDocument = gql`
    mutation AddProductCategories($productId: ID!, $categoryTypes: [CategoryType!]!) {
  addProductCategories(productId: $productId, categoryTypes: $categoryTypes) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;
export type AddProductCategoriesMutationFn = Apollo.MutationFunction<AddProductCategoriesMutation, AddProductCategoriesMutationVariables>;

/**
 * __useAddProductCategoriesMutation__
 *
 * To run a mutation, you first call `useAddProductCategoriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductCategoriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductCategoriesMutation, { data, loading, error }] = useAddProductCategoriesMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      categoryTypes: // value for 'categoryTypes'
 *   },
 * });
 */
export function useAddProductCategoriesMutation(baseOptions?: Apollo.MutationHookOptions<AddProductCategoriesMutation, AddProductCategoriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProductCategoriesMutation, AddProductCategoriesMutationVariables>(AddProductCategoriesDocument, options);
      }
export type AddProductCategoriesMutationHookResult = ReturnType<typeof useAddProductCategoriesMutation>;
export type AddProductCategoriesMutationResult = Apollo.MutationResult<AddProductCategoriesMutation>;
export type AddProductCategoriesMutationOptions = Apollo.BaseMutationOptions<AddProductCategoriesMutation, AddProductCategoriesMutationVariables>;
export const RemoveProductCategoriesDocument = gql`
    mutation RemoveProductCategories($productId: ID!, $categoryTypes: [CategoryType!]!) {
  removeProductCategories(productId: $productId, categoryTypes: $categoryTypes) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;
export type RemoveProductCategoriesMutationFn = Apollo.MutationFunction<RemoveProductCategoriesMutation, RemoveProductCategoriesMutationVariables>;

/**
 * __useRemoveProductCategoriesMutation__
 *
 * To run a mutation, you first call `useRemoveProductCategoriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductCategoriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductCategoriesMutation, { data, loading, error }] = useRemoveProductCategoriesMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      categoryTypes: // value for 'categoryTypes'
 *   },
 * });
 */
export function useRemoveProductCategoriesMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProductCategoriesMutation, RemoveProductCategoriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProductCategoriesMutation, RemoveProductCategoriesMutationVariables>(RemoveProductCategoriesDocument, options);
      }
export type RemoveProductCategoriesMutationHookResult = ReturnType<typeof useRemoveProductCategoriesMutation>;
export type RemoveProductCategoriesMutationResult = Apollo.MutationResult<RemoveProductCategoriesMutation>;
export type RemoveProductCategoriesMutationOptions = Apollo.BaseMutationOptions<RemoveProductCategoriesMutation, RemoveProductCategoriesMutationVariables>;
export const CreateSubcategoryDocument = gql`
    mutation CreateSubcategory($input: CreateSubcategoryInput!) {
  createSubcategory(input: $input) {
    ...SubcategoryFields
  }
}
    ${SubcategoryFieldsFragmentDoc}`;
export type CreateSubcategoryMutationFn = Apollo.MutationFunction<CreateSubcategoryMutation, CreateSubcategoryMutationVariables>;

/**
 * __useCreateSubcategoryMutation__
 *
 * To run a mutation, you first call `useCreateSubcategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubcategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubcategoryMutation, { data, loading, error }] = useCreateSubcategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSubcategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubcategoryMutation, CreateSubcategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubcategoryMutation, CreateSubcategoryMutationVariables>(CreateSubcategoryDocument, options);
      }
export type CreateSubcategoryMutationHookResult = ReturnType<typeof useCreateSubcategoryMutation>;
export type CreateSubcategoryMutationResult = Apollo.MutationResult<CreateSubcategoryMutation>;
export type CreateSubcategoryMutationOptions = Apollo.BaseMutationOptions<CreateSubcategoryMutation, CreateSubcategoryMutationVariables>;
export const UpdateSubcategoryDocument = gql`
    mutation UpdateSubcategory($input: UpdateSubcategoryInput!) {
  updateSubcategory(input: $input) {
    ...SubcategoryFields
  }
}
    ${SubcategoryFieldsFragmentDoc}`;
export type UpdateSubcategoryMutationFn = Apollo.MutationFunction<UpdateSubcategoryMutation, UpdateSubcategoryMutationVariables>;

/**
 * __useUpdateSubcategoryMutation__
 *
 * To run a mutation, you first call `useUpdateSubcategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubcategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubcategoryMutation, { data, loading, error }] = useUpdateSubcategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSubcategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSubcategoryMutation, UpdateSubcategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSubcategoryMutation, UpdateSubcategoryMutationVariables>(UpdateSubcategoryDocument, options);
      }
export type UpdateSubcategoryMutationHookResult = ReturnType<typeof useUpdateSubcategoryMutation>;
export type UpdateSubcategoryMutationResult = Apollo.MutationResult<UpdateSubcategoryMutation>;
export type UpdateSubcategoryMutationOptions = Apollo.BaseMutationOptions<UpdateSubcategoryMutation, UpdateSubcategoryMutationVariables>;
export const DeleteSubcategoryDocument = gql`
    mutation DeleteSubcategory($id: ID!) {
  deleteSubcategory(id: $id)
}
    `;
export type DeleteSubcategoryMutationFn = Apollo.MutationFunction<DeleteSubcategoryMutation, DeleteSubcategoryMutationVariables>;

/**
 * __useDeleteSubcategoryMutation__
 *
 * To run a mutation, you first call `useDeleteSubcategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubcategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubcategoryMutation, { data, loading, error }] = useDeleteSubcategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSubcategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubcategoryMutation, DeleteSubcategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubcategoryMutation, DeleteSubcategoryMutationVariables>(DeleteSubcategoryDocument, options);
      }
export type DeleteSubcategoryMutationHookResult = ReturnType<typeof useDeleteSubcategoryMutation>;
export type DeleteSubcategoryMutationResult = Apollo.MutationResult<DeleteSubcategoryMutation>;
export type DeleteSubcategoryMutationOptions = Apollo.BaseMutationOptions<DeleteSubcategoryMutation, DeleteSubcategoryMutationVariables>;
export const AddProductSubcategoriesDocument = gql`
    mutation AddProductSubcategories($productId: ID!, $subcategoryIds: [ID!]!) {
  addProductSubcategories(productId: $productId, subcategoryIds: $subcategoryIds) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;
export type AddProductSubcategoriesMutationFn = Apollo.MutationFunction<AddProductSubcategoriesMutation, AddProductSubcategoriesMutationVariables>;

/**
 * __useAddProductSubcategoriesMutation__
 *
 * To run a mutation, you first call `useAddProductSubcategoriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductSubcategoriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductSubcategoriesMutation, { data, loading, error }] = useAddProductSubcategoriesMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      subcategoryIds: // value for 'subcategoryIds'
 *   },
 * });
 */
export function useAddProductSubcategoriesMutation(baseOptions?: Apollo.MutationHookOptions<AddProductSubcategoriesMutation, AddProductSubcategoriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProductSubcategoriesMutation, AddProductSubcategoriesMutationVariables>(AddProductSubcategoriesDocument, options);
      }
export type AddProductSubcategoriesMutationHookResult = ReturnType<typeof useAddProductSubcategoriesMutation>;
export type AddProductSubcategoriesMutationResult = Apollo.MutationResult<AddProductSubcategoriesMutation>;
export type AddProductSubcategoriesMutationOptions = Apollo.BaseMutationOptions<AddProductSubcategoriesMutation, AddProductSubcategoriesMutationVariables>;
export const RemoveProductSubcategoriesDocument = gql`
    mutation RemoveProductSubcategories($productId: ID!, $subcategoryIds: [ID!]!) {
  removeProductSubcategories(
    productId: $productId
    subcategoryIds: $subcategoryIds
  ) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;
export type RemoveProductSubcategoriesMutationFn = Apollo.MutationFunction<RemoveProductSubcategoriesMutation, RemoveProductSubcategoriesMutationVariables>;

/**
 * __useRemoveProductSubcategoriesMutation__
 *
 * To run a mutation, you first call `useRemoveProductSubcategoriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductSubcategoriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductSubcategoriesMutation, { data, loading, error }] = useRemoveProductSubcategoriesMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      subcategoryIds: // value for 'subcategoryIds'
 *   },
 * });
 */
export function useRemoveProductSubcategoriesMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProductSubcategoriesMutation, RemoveProductSubcategoriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProductSubcategoriesMutation, RemoveProductSubcategoriesMutationVariables>(RemoveProductSubcategoriesDocument, options);
      }
export type RemoveProductSubcategoriesMutationHookResult = ReturnType<typeof useRemoveProductSubcategoriesMutation>;
export type RemoveProductSubcategoriesMutationResult = Apollo.MutationResult<RemoveProductSubcategoriesMutation>;
export type RemoveProductSubcategoriesMutationOptions = Apollo.BaseMutationOptions<RemoveProductSubcategoriesMutation, RemoveProductSubcategoriesMutationVariables>;
export const AddTagToProductDocument = gql`
    mutation AddTagToProduct($productId: ID!, $tagInput: TagInput!) {
  addTagToProduct(productId: $productId, tagInput: $tagInput) {
    ...ProductFields
    tags {
      ...TagFields
    }
  }
}
    ${ProductFieldsFragmentDoc}
${TagFieldsFragmentDoc}`;
export type AddTagToProductMutationFn = Apollo.MutationFunction<AddTagToProductMutation, AddTagToProductMutationVariables>;

/**
 * __useAddTagToProductMutation__
 *
 * To run a mutation, you first call `useAddTagToProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTagToProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTagToProductMutation, { data, loading, error }] = useAddTagToProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      tagInput: // value for 'tagInput'
 *   },
 * });
 */
export function useAddTagToProductMutation(baseOptions?: Apollo.MutationHookOptions<AddTagToProductMutation, AddTagToProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTagToProductMutation, AddTagToProductMutationVariables>(AddTagToProductDocument, options);
      }
export type AddTagToProductMutationHookResult = ReturnType<typeof useAddTagToProductMutation>;
export type AddTagToProductMutationResult = Apollo.MutationResult<AddTagToProductMutation>;
export type AddTagToProductMutationOptions = Apollo.BaseMutationOptions<AddTagToProductMutation, AddTagToProductMutationVariables>;
export const RemoveTagFromProductDocument = gql`
    mutation RemoveTagFromProduct($productId: ID!, $tagId: ID!) {
  removeTagFromProduct(productId: $productId, tagId: $tagId) {
    ...ProductFields
    tags {
      ...TagFields
    }
  }
}
    ${ProductFieldsFragmentDoc}
${TagFieldsFragmentDoc}`;
export type RemoveTagFromProductMutationFn = Apollo.MutationFunction<RemoveTagFromProductMutation, RemoveTagFromProductMutationVariables>;

/**
 * __useRemoveTagFromProductMutation__
 *
 * To run a mutation, you first call `useRemoveTagFromProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTagFromProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTagFromProductMutation, { data, loading, error }] = useRemoveTagFromProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      tagId: // value for 'tagId'
 *   },
 * });
 */
export function useRemoveTagFromProductMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTagFromProductMutation, RemoveTagFromProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTagFromProductMutation, RemoveTagFromProductMutationVariables>(RemoveTagFromProductDocument, options);
      }
export type RemoveTagFromProductMutationHookResult = ReturnType<typeof useRemoveTagFromProductMutation>;
export type RemoveTagFromProductMutationResult = Apollo.MutationResult<RemoveTagFromProductMutation>;
export type RemoveTagFromProductMutationOptions = Apollo.BaseMutationOptions<RemoveTagFromProductMutation, RemoveTagFromProductMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetSessionDocument = gql`
    query GetSession {
  session {
    ...SessionFields
  }
}
    ${SessionFieldsFragmentDoc}`;

/**
 * __useGetSessionQuery__
 *
 * To run a query within a React component, call `useGetSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSessionQuery(baseOptions?: Apollo.QueryHookOptions<GetSessionQuery, GetSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, options);
      }
export function useGetSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSessionQuery, GetSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, options);
        }
export function useGetSessionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSessionQuery, GetSessionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, options);
        }
export type GetSessionQueryHookResult = ReturnType<typeof useGetSessionQuery>;
export type GetSessionLazyQueryHookResult = ReturnType<typeof useGetSessionLazyQuery>;
export type GetSessionSuspenseQueryHookResult = ReturnType<typeof useGetSessionSuspenseQuery>;
export type GetSessionQueryResult = Apollo.QueryResult<GetSessionQuery, GetSessionQueryVariables>;
export const CategoriesDocument = gql`
    query Categories {
  categories {
    ...CategoryFields
  }
}
    ${CategoryFieldsFragmentDoc}`;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export function useCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesSuspenseQueryHookResult = ReturnType<typeof useCategoriesSuspenseQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const CategoryByTypeDocument = gql`
    query CategoryByType($type: CategoryType!) {
  categoryByType(type: $type) {
    ...CategoryFields
  }
}
    ${CategoryFieldsFragmentDoc}`;

/**
 * __useCategoryByTypeQuery__
 *
 * To run a query within a React component, call `useCategoryByTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryByTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryByTypeQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useCategoryByTypeQuery(baseOptions: Apollo.QueryHookOptions<CategoryByTypeQuery, CategoryByTypeQueryVariables> & ({ variables: CategoryByTypeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryByTypeQuery, CategoryByTypeQueryVariables>(CategoryByTypeDocument, options);
      }
export function useCategoryByTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryByTypeQuery, CategoryByTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryByTypeQuery, CategoryByTypeQueryVariables>(CategoryByTypeDocument, options);
        }
export function useCategoryByTypeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CategoryByTypeQuery, CategoryByTypeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoryByTypeQuery, CategoryByTypeQueryVariables>(CategoryByTypeDocument, options);
        }
export type CategoryByTypeQueryHookResult = ReturnType<typeof useCategoryByTypeQuery>;
export type CategoryByTypeLazyQueryHookResult = ReturnType<typeof useCategoryByTypeLazyQuery>;
export type CategoryByTypeSuspenseQueryHookResult = ReturnType<typeof useCategoryByTypeSuspenseQuery>;
export type CategoryByTypeQueryResult = Apollo.QueryResult<CategoryByTypeQuery, CategoryByTypeQueryVariables>;
export const CategoryProductsDocument = gql`
    query CategoryProducts($type: CategoryType!, $limit: Int, $offset: Int, $subcategoryId: ID) {
  categoryProducts(
    type: $type
    limit: $limit
    offset: $offset
    subcategoryId: $subcategoryId
  ) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;

/**
 * __useCategoryProductsQuery__
 *
 * To run a query within a React component, call `useCategoryProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryProductsQuery({
 *   variables: {
 *      type: // value for 'type'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      subcategoryId: // value for 'subcategoryId'
 *   },
 * });
 */
export function useCategoryProductsQuery(baseOptions: Apollo.QueryHookOptions<CategoryProductsQuery, CategoryProductsQueryVariables> & ({ variables: CategoryProductsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryProductsQuery, CategoryProductsQueryVariables>(CategoryProductsDocument, options);
      }
export function useCategoryProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryProductsQuery, CategoryProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryProductsQuery, CategoryProductsQueryVariables>(CategoryProductsDocument, options);
        }
export function useCategoryProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CategoryProductsQuery, CategoryProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoryProductsQuery, CategoryProductsQueryVariables>(CategoryProductsDocument, options);
        }
export type CategoryProductsQueryHookResult = ReturnType<typeof useCategoryProductsQuery>;
export type CategoryProductsLazyQueryHookResult = ReturnType<typeof useCategoryProductsLazyQuery>;
export type CategoryProductsSuspenseQueryHookResult = ReturnType<typeof useCategoryProductsSuspenseQuery>;
export type CategoryProductsQueryResult = Apollo.QueryResult<CategoryProductsQuery, CategoryProductsQueryVariables>;
export const CategorySubcategoriesDocument = gql`
    query CategorySubcategories($type: CategoryType!) {
  categorySubcategories(type: $type) {
    ...SubcategoryFields
  }
}
    ${SubcategoryFieldsFragmentDoc}`;

/**
 * __useCategorySubcategoriesQuery__
 *
 * To run a query within a React component, call `useCategorySubcategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategorySubcategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategorySubcategoriesQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useCategorySubcategoriesQuery(baseOptions: Apollo.QueryHookOptions<CategorySubcategoriesQuery, CategorySubcategoriesQueryVariables> & ({ variables: CategorySubcategoriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategorySubcategoriesQuery, CategorySubcategoriesQueryVariables>(CategorySubcategoriesDocument, options);
      }
export function useCategorySubcategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategorySubcategoriesQuery, CategorySubcategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategorySubcategoriesQuery, CategorySubcategoriesQueryVariables>(CategorySubcategoriesDocument, options);
        }
export function useCategorySubcategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CategorySubcategoriesQuery, CategorySubcategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategorySubcategoriesQuery, CategorySubcategoriesQueryVariables>(CategorySubcategoriesDocument, options);
        }
export type CategorySubcategoriesQueryHookResult = ReturnType<typeof useCategorySubcategoriesQuery>;
export type CategorySubcategoriesLazyQueryHookResult = ReturnType<typeof useCategorySubcategoriesLazyQuery>;
export type CategorySubcategoriesSuspenseQueryHookResult = ReturnType<typeof useCategorySubcategoriesSuspenseQuery>;
export type CategorySubcategoriesQueryResult = Apollo.QueryResult<CategorySubcategoriesQuery, CategorySubcategoriesQueryVariables>;
export const ProductsDocument = gql`
    query Products($limit: Int, $offset: Int, $tagSlugs: [String!]) {
  products(limit: $limit, offset: $offset, tagSlugs: $tagSlugs) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      tagSlugs: // value for 'tagSlugs'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export function useProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsSuspenseQueryHookResult = ReturnType<typeof useProductsSuspenseQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const ProductDocument = gql`
    query Product($id: ID!) {
  product(id: $id) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables> & ({ variables: ProductQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export function useProductSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductSuspenseQueryHookResult = ReturnType<typeof useProductSuspenseQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const ReportedProductsDocument = gql`
    query ReportedProducts($limit: Int, $offset: Int, $tagSlug: String) {
  reportedProducts(limit: $limit, offset: $offset) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;

/**
 * __useReportedProductsQuery__
 *
 * To run a query within a React component, call `useReportedProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportedProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportedProductsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      tagSlug: // value for 'tagSlug'
 *   },
 * });
 */
export function useReportedProductsQuery(baseOptions?: Apollo.QueryHookOptions<ReportedProductsQuery, ReportedProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportedProductsQuery, ReportedProductsQueryVariables>(ReportedProductsDocument, options);
      }
export function useReportedProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportedProductsQuery, ReportedProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportedProductsQuery, ReportedProductsQueryVariables>(ReportedProductsDocument, options);
        }
export function useReportedProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ReportedProductsQuery, ReportedProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReportedProductsQuery, ReportedProductsQueryVariables>(ReportedProductsDocument, options);
        }
export type ReportedProductsQueryHookResult = ReturnType<typeof useReportedProductsQuery>;
export type ReportedProductsLazyQueryHookResult = ReturnType<typeof useReportedProductsLazyQuery>;
export type ReportedProductsSuspenseQueryHookResult = ReturnType<typeof useReportedProductsSuspenseQuery>;
export type ReportedProductsQueryResult = Apollo.QueryResult<ReportedProductsQuery, ReportedProductsQueryVariables>;
export const MyProductsDocument = gql`
    query MyProducts {
  myProducts {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;

/**
 * __useMyProductsQuery__
 *
 * To run a query within a React component, call `useMyProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProductsQuery(baseOptions?: Apollo.QueryHookOptions<MyProductsQuery, MyProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProductsQuery, MyProductsQueryVariables>(MyProductsDocument, options);
      }
export function useMyProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProductsQuery, MyProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProductsQuery, MyProductsQueryVariables>(MyProductsDocument, options);
        }
export function useMyProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyProductsQuery, MyProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyProductsQuery, MyProductsQueryVariables>(MyProductsDocument, options);
        }
export type MyProductsQueryHookResult = ReturnType<typeof useMyProductsQuery>;
export type MyProductsLazyQueryHookResult = ReturnType<typeof useMyProductsLazyQuery>;
export type MyProductsSuspenseQueryHookResult = ReturnType<typeof useMyProductsSuspenseQuery>;
export type MyProductsQueryResult = Apollo.QueryResult<MyProductsQuery, MyProductsQueryVariables>;
export const SubcategoriesDocument = gql`
    query Subcategories($categoryType: CategoryType!) {
  subcategories(categoryType: $categoryType) {
    ...SubcategoryFields
  }
}
    ${SubcategoryFieldsFragmentDoc}`;

/**
 * __useSubcategoriesQuery__
 *
 * To run a query within a React component, call `useSubcategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubcategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubcategoriesQuery({
 *   variables: {
 *      categoryType: // value for 'categoryType'
 *   },
 * });
 */
export function useSubcategoriesQuery(baseOptions: Apollo.QueryHookOptions<SubcategoriesQuery, SubcategoriesQueryVariables> & ({ variables: SubcategoriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubcategoriesQuery, SubcategoriesQueryVariables>(SubcategoriesDocument, options);
      }
export function useSubcategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubcategoriesQuery, SubcategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubcategoriesQuery, SubcategoriesQueryVariables>(SubcategoriesDocument, options);
        }
export function useSubcategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SubcategoriesQuery, SubcategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SubcategoriesQuery, SubcategoriesQueryVariables>(SubcategoriesDocument, options);
        }
export type SubcategoriesQueryHookResult = ReturnType<typeof useSubcategoriesQuery>;
export type SubcategoriesLazyQueryHookResult = ReturnType<typeof useSubcategoriesLazyQuery>;
export type SubcategoriesSuspenseQueryHookResult = ReturnType<typeof useSubcategoriesSuspenseQuery>;
export type SubcategoriesQueryResult = Apollo.QueryResult<SubcategoriesQuery, SubcategoriesQueryVariables>;
export const SubcategoryDocument = gql`
    query Subcategory($fullSlug: String!) {
  subcategory(fullSlug: $fullSlug) {
    ...SubcategoryFields
  }
}
    ${SubcategoryFieldsFragmentDoc}`;

/**
 * __useSubcategoryQuery__
 *
 * To run a query within a React component, call `useSubcategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubcategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubcategoryQuery({
 *   variables: {
 *      fullSlug: // value for 'fullSlug'
 *   },
 * });
 */
export function useSubcategoryQuery(baseOptions: Apollo.QueryHookOptions<SubcategoryQuery, SubcategoryQueryVariables> & ({ variables: SubcategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubcategoryQuery, SubcategoryQueryVariables>(SubcategoryDocument, options);
      }
export function useSubcategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubcategoryQuery, SubcategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubcategoryQuery, SubcategoryQueryVariables>(SubcategoryDocument, options);
        }
export function useSubcategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SubcategoryQuery, SubcategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SubcategoryQuery, SubcategoryQueryVariables>(SubcategoryDocument, options);
        }
export type SubcategoryQueryHookResult = ReturnType<typeof useSubcategoryQuery>;
export type SubcategoryLazyQueryHookResult = ReturnType<typeof useSubcategoryLazyQuery>;
export type SubcategorySuspenseQueryHookResult = ReturnType<typeof useSubcategorySuspenseQuery>;
export type SubcategoryQueryResult = Apollo.QueryResult<SubcategoryQuery, SubcategoryQueryVariables>;
export const TagsDocument = gql`
    query Tags {
  tags {
    ...TagFields
  }
}
    ${TagFieldsFragmentDoc}`;

/**
 * __useTagsQuery__
 *
 * To run a query within a React component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagsQuery(baseOptions?: Apollo.QueryHookOptions<TagsQuery, TagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
      }
export function useTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
        }
export function useTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
        }
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsSuspenseQueryHookResult = ReturnType<typeof useTagsSuspenseQuery>;
export type TagsQueryResult = Apollo.QueryResult<TagsQuery, TagsQueryVariables>;
export const PopularTagsDocument = gql`
    query PopularTags($limit: Int) {
  popularTags(limit: $limit) {
    ...TagFields
  }
}
    ${TagFieldsFragmentDoc}`;

/**
 * __usePopularTagsQuery__
 *
 * To run a query within a React component, call `usePopularTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePopularTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePopularTagsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePopularTagsQuery(baseOptions?: Apollo.QueryHookOptions<PopularTagsQuery, PopularTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PopularTagsQuery, PopularTagsQueryVariables>(PopularTagsDocument, options);
      }
export function usePopularTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PopularTagsQuery, PopularTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PopularTagsQuery, PopularTagsQueryVariables>(PopularTagsDocument, options);
        }
export function usePopularTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PopularTagsQuery, PopularTagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PopularTagsQuery, PopularTagsQueryVariables>(PopularTagsDocument, options);
        }
export type PopularTagsQueryHookResult = ReturnType<typeof usePopularTagsQuery>;
export type PopularTagsLazyQueryHookResult = ReturnType<typeof usePopularTagsLazyQuery>;
export type PopularTagsSuspenseQueryHookResult = ReturnType<typeof usePopularTagsSuspenseQuery>;
export type PopularTagsQueryResult = Apollo.QueryResult<PopularTagsQuery, PopularTagsQueryVariables>;
export const TagDocument = gql`
    query Tag($slug: String!) {
  tag(slug: $slug) {
    ...TagFields
  }
}
    ${TagFieldsFragmentDoc}`;

/**
 * __useTagQuery__
 *
 * To run a query within a React component, call `useTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useTagQuery(baseOptions: Apollo.QueryHookOptions<TagQuery, TagQueryVariables> & ({ variables: TagQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagQuery, TagQueryVariables>(TagDocument, options);
      }
export function useTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagQuery, TagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagQuery, TagQueryVariables>(TagDocument, options);
        }
export function useTagSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TagQuery, TagQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TagQuery, TagQueryVariables>(TagDocument, options);
        }
export type TagQueryHookResult = ReturnType<typeof useTagQuery>;
export type TagLazyQueryHookResult = ReturnType<typeof useTagLazyQuery>;
export type TagSuspenseQueryHookResult = ReturnType<typeof useTagSuspenseQuery>;
export type TagQueryResult = Apollo.QueryResult<TagQuery, TagQueryVariables>;
export const ProductsByTagDocument = gql`
    query ProductsByTag($tagSlug: String!, $limit: Int, $offset: Int) {
  productsByTag(tagSlug: $tagSlug, limit: $limit, offset: $offset) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;

/**
 * __useProductsByTagQuery__
 *
 * To run a query within a React component, call `useProductsByTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsByTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsByTagQuery({
 *   variables: {
 *      tagSlug: // value for 'tagSlug'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useProductsByTagQuery(baseOptions: Apollo.QueryHookOptions<ProductsByTagQuery, ProductsByTagQueryVariables> & ({ variables: ProductsByTagQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsByTagQuery, ProductsByTagQueryVariables>(ProductsByTagDocument, options);
      }
export function useProductsByTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsByTagQuery, ProductsByTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsByTagQuery, ProductsByTagQueryVariables>(ProductsByTagDocument, options);
        }
export function useProductsByTagSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductsByTagQuery, ProductsByTagQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductsByTagQuery, ProductsByTagQueryVariables>(ProductsByTagDocument, options);
        }
export type ProductsByTagQueryHookResult = ReturnType<typeof useProductsByTagQuery>;
export type ProductsByTagLazyQueryHookResult = ReturnType<typeof useProductsByTagLazyQuery>;
export type ProductsByTagSuspenseQueryHookResult = ReturnType<typeof useProductsByTagSuspenseQuery>;
export type ProductsByTagQueryResult = Apollo.QueryResult<ProductsByTagQuery, ProductsByTagQueryVariables>;