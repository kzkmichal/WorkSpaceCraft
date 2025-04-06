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
  imageUrl: Scalars['String']['input'];
  originalStoreLink: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  subcategoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
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
  changePassword?: Maybe<AuthResult>;
  createProduct: Product;
  createSubcategory: Subcategory;
  deleteProduct: Scalars['Boolean']['output'];
  deleteSubcategory: Scalars['Boolean']['output'];
  removeProductCategories: Product;
  removeProductSubcategories: Product;
  updateProduct: Product;
  updateSubcategory: Subcategory;
  updateUserProfile?: Maybe<User>;
};


export type MutationAddProductCategoriesArgs = {
  categoryTypes: Array<CategoryType>;
  productId: Scalars['ID']['input'];
};


export type MutationAddProductSubcategoriesArgs = {
  productId: Scalars['ID']['input'];
  subcategoryIds: Array<Scalars['ID']['input']>;
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


export type MutationRemoveProductCategoriesArgs = {
  categoryTypes: Array<CategoryType>;
  productId: Scalars['ID']['input'];
};


export type MutationRemoveProductSubcategoriesArgs = {
  productId: Scalars['ID']['input'];
  subcategoryIds: Array<Scalars['ID']['input']>;
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

export type Product = {
  categories: Array<CategoryType>;
  createdAt: Scalars['String']['output'];
  createdBy: User;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  originalStoreLink: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  reviews?: Maybe<Array<Maybe<Review>>>;
  subcategories?: Maybe<Array<Maybe<Subcategory>>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  categories: Array<CategoryInfo>;
  categoryByType: CategoryInfo;
  categoryProducts: Array<Product>;
  categorySubcategories: Array<Subcategory>;
  me?: Maybe<User>;
  product?: Maybe<Product>;
  products: Array<Product>;
  session?: Maybe<Session>;
  subcategories: Array<Subcategory>;
  subcategory?: Maybe<Subcategory>;
  user?: Maybe<User>;
  users: Array<User>;
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


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductsArgs = {
  categoryType?: InputMaybe<CategoryType>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  subcategoryFullSlug?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySubcategoriesArgs = {
  categoryType?: InputMaybe<CategoryType>;
};


export type QuerySubcategoryArgs = {
  fullSlug: Scalars['String']['input'];
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

export type UpdateProductInput = {
  categoryTypes?: InputMaybe<Array<CategoryType>>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  originalStoreLink?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  subcategoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
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
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Product>>;
  reviews?: Maybe<Array<Review>>;
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
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  Session: ResolverTypeWrapper<Session>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subcategory: ResolverTypeWrapper<Subcategory>;
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
  Query: {};
  Review: Review;
  Session: Session;
  String: Scalars['String']['output'];
  Subcategory: Subcategory;
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
  changePassword?: Resolver<Maybe<ResolversTypes['AuthResult']>, ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'input'>>;
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'input'>>;
  createSubcategory?: Resolver<ResolversTypes['Subcategory'], ParentType, ContextType, RequireFields<MutationCreateSubcategoryArgs, 'input'>>;
  deleteProduct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>;
  deleteSubcategory?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteSubcategoryArgs, 'id'>>;
  removeProductCategories?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationRemoveProductCategoriesArgs, 'categoryTypes' | 'productId'>>;
  removeProductSubcategories?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationRemoveProductSubcategoriesArgs, 'productId' | 'subcategoryIds'>>;
  updateProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'input'>>;
  updateSubcategory?: Resolver<ResolversTypes['Subcategory'], ParentType, ContextType, RequireFields<MutationUpdateSubcategoryArgs, 'input'>>;
  updateUserProfile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserProfileArgs, 'input'>>;
};

export type ProductResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  categories?: Resolver<Array<ResolversTypes['CategoryType']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalStoreLink?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<Maybe<ResolversTypes['Review']>>>, ParentType, ContextType>;
  subcategories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Subcategory']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  categories?: Resolver<Array<ResolversTypes['CategoryInfo']>, ParentType, ContextType>;
  categoryByType?: Resolver<ResolversTypes['CategoryInfo'], ParentType, ContextType, RequireFields<QueryCategoryByTypeArgs, 'type'>>;
  categoryProducts?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryCategoryProductsArgs, 'type'>>;
  categorySubcategories?: Resolver<Array<ResolversTypes['Subcategory']>, ParentType, ContextType, RequireFields<QueryCategorySubcategoriesArgs, 'type'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, Partial<QueryProductsArgs>>;
  session?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType>;
  subcategories?: Resolver<Array<ResolversTypes['Subcategory']>, ParentType, ContextType, Partial<QuerySubcategoriesArgs>>;
  subcategory?: Resolver<Maybe<ResolversTypes['Subcategory']>, ParentType, ContextType, RequireFields<QuerySubcategoryArgs, 'fullSlug'>>;
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

export type UserResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailVerified?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ApolloContext> = {
  AuthResult?: AuthResultResolvers<ContextType>;
  CategoryInfo?: CategoryInfoResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  Subcategory?: SubcategoryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


export type UserFieldsFragment = { id: string, name?: string | undefined, email: string, image?: string | undefined, createdAt: string, updatedAt: string };

export type SessionFieldsFragment = { expires?: string | undefined, user?: { id: string, name?: string | undefined, email: string, image?: string | undefined, createdAt: string, updatedAt: string } | undefined };

export type AuthResultFieldsFragment = { success: boolean, message?: string | undefined, user?: { id: string, name?: string | undefined, email: string, image?: string | undefined, createdAt: string, updatedAt: string } | undefined };

export type CategoryFieldsFragment = { name: string, slug: string, description?: string | undefined, imageUrl?: string | undefined, type: CategoryType, products?: Array<{ id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } | undefined> | undefined, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } | undefined> | undefined } | undefined> | undefined };

export type UserFragment = { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string };

export type ProductFieldsFragment = { id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined };

export type SubcategoryFieldsFragment = { id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } | undefined> | undefined };

export type UpdateUserProfileMutationVariables = Exact<{
  input: UpdateUserProfileInput;
}>;


export type UpdateUserProfileMutation = { updateUserProfile?: { id: string, name?: string | undefined, email: string, image?: string | undefined, createdAt: string, updatedAt: string } | undefined };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { changePassword?: { success: boolean, message?: string | undefined } | undefined };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { createProduct: { id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } };

export type UpdateProductMutationVariables = Exact<{
  input: UpdateProductInput;
}>;


export type UpdateProductMutation = { updateProduct: { id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProductMutation = { deleteProduct: boolean };

export type AddProductCategoriesMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  categoryTypes: Array<CategoryType> | CategoryType;
}>;


export type AddProductCategoriesMutation = { addProductCategories: { id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } };

export type RemoveProductCategoriesMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  categoryTypes: Array<CategoryType> | CategoryType;
}>;


export type RemoveProductCategoriesMutation = { removeProductCategories: { id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } };

export type CreateSubcategoryMutationVariables = Exact<{
  input: CreateSubcategoryInput;
}>;


export type CreateSubcategoryMutation = { createSubcategory: { id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } | undefined> | undefined } };

export type UpdateSubcategoryMutationVariables = Exact<{
  input: UpdateSubcategoryInput;
}>;


export type UpdateSubcategoryMutation = { updateSubcategory: { id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } | undefined> | undefined } };

export type DeleteSubcategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSubcategoryMutation = { deleteSubcategory: boolean };

export type AddProductSubcategoriesMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  subcategoryIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type AddProductSubcategoriesMutation = { addProductSubcategories: { id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } };

export type RemoveProductSubcategoriesMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  subcategoryIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type RemoveProductSubcategoriesMutation = { removeProductSubcategories: { id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me?: { id: string, name?: string | undefined, email: string, image?: string | undefined, createdAt: string, updatedAt: string } | undefined };

export type GetSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionQuery = { session?: { expires?: string | undefined, user?: { id: string, name?: string | undefined, email: string, image?: string | undefined, createdAt: string, updatedAt: string } | undefined } | undefined };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { categories: Array<{ name: string, slug: string, description?: string | undefined, imageUrl?: string | undefined, type: CategoryType, products?: Array<{ id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } | undefined> | undefined, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } | undefined> | undefined } | undefined> | undefined }> };

export type CategoryByTypeQueryVariables = Exact<{
  type: CategoryType;
}>;


export type CategoryByTypeQuery = { categoryByType: { name: string, slug: string, description?: string | undefined, imageUrl?: string | undefined, type: CategoryType, products?: Array<{ id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } | undefined> | undefined, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } | undefined> | undefined } | undefined> | undefined } };

export type CategoryProductsQueryVariables = Exact<{
  type: CategoryType;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  subcategoryId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CategoryProductsQuery = { categoryProducts: Array<{ id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined }> };

export type CategorySubcategoriesQueryVariables = Exact<{
  type: CategoryType;
}>;


export type CategorySubcategoriesQuery = { categorySubcategories: Array<{ id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } | undefined> | undefined }> };

export type ProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProductsQuery = { products: Array<{ id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined }> };

export type ProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProductQuery = { product?: { id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } | undefined };

export type SubcategoriesQueryVariables = Exact<{
  categoryType: CategoryType;
}>;


export type SubcategoriesQuery = { subcategories: Array<{ id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } | undefined> | undefined }> };

export type SubcategoryQueryVariables = Exact<{
  fullSlug: Scalars['String']['input'];
}>;


export type SubcategoryQuery = { subcategory?: { id: string, name: string, slug: string, fullSlug: string, description?: string | undefined, categoryType: CategoryType, createdAt: string, updatedAt: string, products?: Array<{ id: string, title: string, description: string, imageUrl: string, price: number, originalStoreLink: string, createdAt: string, updatedAt: string, categories: Array<CategoryType>, createdBy: { id: string, name?: string | undefined, email: string, createdAt: string, updatedAt: string }, subcategories?: Array<{ id: string, name: string, slug: string, fullSlug: string, categoryType: CategoryType } | undefined> | undefined } | undefined> | undefined } | undefined };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  name
  email
  image
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
}
    `;
export const ProductFieldsFragmentDoc = gql`
    fragment ProductFields on Product {
  id
  title
  description
  imageUrl
  price
  originalStoreLink
  createdAt
  updatedAt
  createdBy {
    ...User
  }
  categories
  subcategories {
    id
    name
    slug
    fullSlug
    categoryType
  }
}
    ${UserFragmentDoc}`;
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
    query Products($limit: Int, $offset: Int) {
  products(limit: $limit, offset: $offset) {
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