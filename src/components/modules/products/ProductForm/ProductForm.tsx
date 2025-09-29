"use client";

import { useRouter } from "next/navigation";
import {
	useForm,
	FormProvider,
	SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormProps } from "./types";
import { ImageUpload } from "./components/ImageUpload";
import {
	ProductImage,
	productSchema,
	type ProductFormValues,
	type ProductDimension,
	type ProductTechnicalFeature,
	type ProductProCon,
	type ProductUserExperience,
} from "@/lib/validations/product";
import {
	createProduct,
	ProductResult,
	updateProduct,
} from "@/app/actions/product";
import {
	FormError,
	FormSuccess,
	HookFormField,
	HookFormTextarea,
	SubmitButton,
	TagInput,
} from "@/components/common/molecules/Form";
import {
	DimensionInput,
	TechnicalFeatureInput,
	ProsConsInput,
	UserExperienceInput,
} from "./components/";
import { useTags } from "@/hooks/tags/useTags";

export function ProductForm({
	categories,
	product,
	isEditing = false,
}: ProductFormProps) {
	const router = useRouter();
	const { tags: existingTags } = useTags();

	const initialImages: ProductImage[] =
		product?.images?.map((img) => ({
			...img,
			isPrimary: img.isPrimary === undefined ? false : img.isPrimary,
		})) || [];

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			title: product?.title || "",
			description: product?.description || "",
			price: product?.price || 0,
			originalStoreLink: product?.originalStoreLink || "",
			categoryTypes: product?.categoryTypes || [],
			subcategoryIds: product?.subcategoryIds || [],
			images: initialImages,
			tags: product?.tags || existingTags || [],
			brand: product?.brand || "",
			model: product?.model || "",
			dimensions: product?.dimensions || [],
			technicalFeatures: product?.technicalFeatures || [],
			pros: product?.pros || [],
			cons: product?.cons || [],
			userExperience: product?.userExperience || {
				setupDifficulty: "EASY",
				assemblyRequired: false,
				toolsNeeded: [],
				compatibility: [],
				userManualLink: "",
			},
		},
	});

	const {
		handleSubmit,
		watch,
		setValue,
		getValues,
		setError,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = form;

	const selectedCategories = watch("categoryTypes") || [];

	const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
		try {
			let result: ProductResult;

			if (isEditing && product?.id) {
				result = await updateProduct(product.id, data);
			} else {
				result = await createProduct(data);
			}

			if (!result.success) {
				setError("root", {
					type: "manual",
					message:
						result.error ||
						"Error occurred while processing your request. Please try again.",
				});
			} else {
				setTimeout(() => {
					if (isEditing) {
						router.push(`/products/${result.productId}`);
					} else {
						router.push("/profile");
					}
					router.refresh();
				}, 1500);
			}
		} catch (err) {
			setError("root", {
				type: "manual",
				message: "An unexpected error occurred. Please try again.",
			});

			console.error(err);
		}
	};

	const handleCategoryToggle = (categoryType: string) => {
		const currentValues = getValues("categoryTypes") || [];
		const updatedValues = currentValues.includes(categoryType)
			? currentValues.filter((type) => type !== categoryType)
			: [...currentValues, categoryType];

		setValue("categoryTypes", updatedValues, {
			shouldValidate: true,
		});
	};

	const handleSubcategoryToggle = (subcategoryId: string) => {
		const currentValues = getValues("subcategoryIds") || [];
		const updatedValues = currentValues.includes(subcategoryId)
			? currentValues.filter((id) => id !== subcategoryId)
			: [...currentValues, subcategoryId];

		setValue("subcategoryIds", updatedValues, {
			shouldValidate: true,
		});
	};

	const handleImagesChange = (images: ProductImage[]) => {
		setValue("images", images, { shouldValidate: true });
	};

	const handleDimensionsChange = (dimensions: ProductDimension[]) => {
		setValue("dimensions", dimensions, { shouldValidate: true });
	};

	const handleTechnicalFeaturesChange = (
		features: ProductTechnicalFeature[],
	) => {
		setValue("technicalFeatures", features, { shouldValidate: true });
	};

	const handleProsChange = (pros: ProductProCon[]) => {
		setValue("pros", pros, { shouldValidate: true });
	};

	const handleConsChange = (cons: ProductProCon[]) => {
		setValue("cons", cons, { shouldValidate: true });
	};

	const handleUserExperienceChange = (
		userExperience: ProductUserExperience,
	) => {
		setValue("userExperience", userExperience, {
			shouldValidate: true,
		});
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
			<div className="mx-auto max-w-6xl p-6">
				<FormProvider {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div className="mb-8 text-center">
							<h1 className="mb-2 text-3xl font-bold text-foreground">
								{isEditing ? "Edit Product" : "Add New Product"}
							</h1>
							<p className="text-muted-foreground">
								Provide detailed information about your workspace
								product
							</p>
						</div>
						<FormError message={errors.root?.message} />
						<FormSuccess
							message={
								isSubmitSuccessful
									? isEditing
										? "Product updated successfully!"
										: "Product added successfully!"
									: null
							}
						/>
						<div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
							<div className="border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5 px-6 py-4">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
										<span className="text-lg">📝</span>
									</div>
									<div>
										<h3 className="text-xl font-semibold text-foreground">
											Basic Information
										</h3>
										<p className="text-sm text-muted-foreground">
											Enter the main product details
										</p>
									</div>
								</div>
							</div>
							<div className="space-y-6 p-6">
								<HookFormField<ProductFormValues>
									name="title"
									label="Product name"
									placeholder="Enter product name"
								/>

								<HookFormTextarea<ProductFormValues>
									name="description"
									label="Product description"
									rows={4}
									placeholder="Enter product description"
								/>

								<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
									<HookFormField<ProductFormValues>
										name="brand"
										label="Brand"
										placeholder="e.g., IKEA, Herman Miller, Logitech"
									/>

									<HookFormField<ProductFormValues>
										name="model"
										label="Model (Optional)"
										placeholder="e.g., Markus, Aeron Chair, MX Master 3"
									/>
								</div>

								<HookFormField<ProductFormValues>
									name="price"
									label="Price"
									type="number"
									placeholder="0.00"
								/>
							</div>
						</div>
						<div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
							<div className="border-b border-border bg-gradient-to-r from-secondary/5 to-accent/5 px-6 py-4">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
										<span className="text-lg">📸</span>
									</div>
									<div>
										<h3 className="text-xl font-semibold text-foreground">
											Images & Links
										</h3>
										<p className="text-sm text-muted-foreground">
											Add product photos and external links
										</p>
									</div>
								</div>
							</div>
							<div className="space-y-6 p-6">
								<div>
									<label className="mb-3 block text-sm font-medium text-foreground">
										Product Images
									</label>
									<ImageUpload
										images={watch("images") || []}
										onChange={handleImagesChange}
										maxImages={5}
									/>
									{errors.images && (
										<p className="mt-2 text-sm text-destructive">
											{errors.images.message as string}
										</p>
									)}
								</div>

								<HookFormField<ProductFormValues>
									name="originalStoreLink"
									label="Link to the original store"
									type="url"
									placeholder="https://example.com/original-product-link"
								/>

								<TagInput
									name="tags"
									label="Tags"
									existingTags={existingTags}
									placeholder="Search or add tags..."
								/>
							</div>
						</div>
						<div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
							<div className="border-b border-border bg-gradient-to-r from-accent/5 to-primary/5 px-6 py-4">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
										<span className="text-lg">🏷️</span>
									</div>
									<div>
										<h3 className="text-xl font-semibold text-foreground">
											Categories
										</h3>
										<p className="text-sm text-muted-foreground">
											Select product categories and subcategories
										</p>
									</div>
								</div>
							</div>
							<div className="space-y-6 p-6">
								<div>
									<label className="mb-4 block text-sm font-medium text-foreground">
										Product categories
									</label>
									<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
										{categories.map((category) => (
											<label
												key={category.type}
												className="flex cursor-pointer items-center rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
											>
												<input
													type="checkbox"
													checked={selectedCategories.includes(
														category.type,
													)}
													onChange={() =>
														handleCategoryToggle(category.type)
													}
													className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
												/>
												<span className="ml-3 text-sm font-medium text-foreground">
													{category.name}
												</span>
											</label>
										))}
									</div>
									{errors.categoryTypes && (
										<p className="mt-2 text-sm text-destructive">
											{errors.categoryTypes.message as string}
										</p>
									)}
								</div>
								{selectedCategories.length > 0 && (
									<div>
										<label className="mb-4 block text-sm font-medium text-foreground">
											Subcategories
										</label>
										<div className="max-h-60 overflow-y-auto rounded-lg border border-border bg-muted/20 p-4">
											{categories
												.filter((cat) =>
													selectedCategories.includes(cat.type),
												)
												.map((category) => (
													<div
														key={category.type}
														className="mb-4 last:mb-0"
													>
														<h4 className="mb-2 font-medium text-foreground">
															{category.name}
														</h4>
														<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
															{category.subcategories?.length ? (
																category.subcategories.map(
																	(subcategory) => (
																		<label
																			key={subcategory.id}
																			className="flex cursor-pointer items-center rounded-md border border-border bg-card p-2 transition-colors hover:bg-muted/50"
																		>
																			<input
																				type="checkbox"
																				checked={(
																					getValues(
																						"subcategoryIds",
																					) || []
																				).includes(subcategory.id)}
																				onChange={() =>
																					handleSubcategoryToggle(
																						subcategory.id,
																					)
																				}
																				className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
																			/>
																			<span className="ml-2 text-sm text-foreground">
																				{subcategory.name}
																			</span>
																		</label>
																	),
																)
															) : (
																<p className="col-span-full text-sm text-muted-foreground">
																	No subcategories available
																</p>
															)}
														</div>
													</div>
												))}
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="grid grid-cols-1 gap-6">
							<div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
								<div className="border-b border-border bg-gradient-to-r from-muted/30 to-muted/10 px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50">
											<span className="text-lg">📏</span>
										</div>
										<div>
											<h3 className="text-xl font-semibold text-foreground">
												Physical Dimensions
											</h3>
											<p className="text-sm text-muted-foreground">
												Add size and weight specifications
											</p>
										</div>
									</div>
								</div>
								<div className="p-6">
									<DimensionInput
										dimensions={watch("dimensions") || []}
										onChange={handleDimensionsChange}
										error={errors.dimensions?.message}
									/>
								</div>
							</div>
							<div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
								<div className="border-b border-border bg-gradient-to-r from-secondary/10 to-accent/5 px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/20">
											<span className="text-lg">⚙️</span>
										</div>
										<div>
											<h3 className="text-xl font-semibold text-foreground">
												Technical Features
											</h3>
											<p className="text-sm text-muted-foreground">
												Specify technical specifications
											</p>
										</div>
									</div>
								</div>
								<div className="p-6">
									<TechnicalFeatureInput
										technicalFeatures={
											watch("technicalFeatures") || []
										}
										onChange={handleTechnicalFeaturesChange}
										error={errors.technicalFeatures?.message}
									/>
								</div>
							</div>
						</div>
						<div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
							<div className="border-b border-border bg-gradient-to-r from-accent/5 to-primary/5 px-6 py-4">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
										<span className="text-lg">🚀</span>
									</div>
									<div>
										<h3 className="text-xl font-semibold text-foreground">
											User Experience
										</h3>
										<p className="text-sm text-muted-foreground">
											Setup difficulty and compatibility details
										</p>
									</div>
								</div>
							</div>
							<div className="p-6">
								<UserExperienceInput
									userExperience={watch("userExperience")}
									onChange={handleUserExperienceChange}
									error={errors.userExperience?.message}
								/>
							</div>
						</div>
						<div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
							<div className="border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5 px-6 py-4">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
										<span className="text-lg">⚖️</span>
									</div>
									<div>
										<h3 className="text-xl font-semibold text-foreground">
											Pros & Cons
										</h3>
										<p className="text-sm text-muted-foreground">
											List advantages and disadvantages
										</p>
									</div>
								</div>
							</div>
							<div className="p-6">
								<ProsConsInput
									pros={watch("pros") || []}
									cons={watch("cons") || []}
									onProsChange={handleProsChange}
									onConsChange={handleConsChange}
									error={errors.pros?.message || errors.cons?.message}
								/>
							</div>
						</div>
						<div className="flex justify-end space-x-4 rounded-xl border-t border-border bg-muted/20 px-6 py-4">
							<button
								type="button"
								onClick={() => router.back()}
								className="rounded-lg border border-border bg-card px-6 py-2 text-foreground transition-colors hover:bg-muted/50"
								disabled={isSubmitting}
							>
								Cancel
							</button>
							<SubmitButton isLoading={isSubmitting}>
								{isEditing ? "Save Product" : "Add Product"}
							</SubmitButton>
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	);
}
