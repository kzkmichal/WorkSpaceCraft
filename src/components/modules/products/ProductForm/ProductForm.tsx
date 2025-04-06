"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormProps } from "./types";
import {
	productSchema,
	type ProductFormValues,
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
} from "@/components/common/molecules/Form";
import { isValidUrl } from "@/components/utils/helpers";

export function ProductForm({
	categories,
	product,
	isEditing = false,
}: ProductFormProps) {
	const router = useRouter();

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			title: product?.title || "",
			description: product?.description || "",
			price: product?.price || 0,
			imageUrl: product?.imageUrl || "",
			originalStoreLink: product?.originalStoreLink || "",
			categoryTypes: product?.categoryTypes || [],
			subcategoryIds: product?.subcategoryIds || [],
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
	const imageUrl = watch("imageUrl");

	const showImagePreview = imageUrl && isValidUrl(imageUrl);

	const onSubmit = async (data: ProductFormValues) => {
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

	return (
		<FormProvider {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<FormError message={errors.root?.message} />
				<FormSuccess
					message={
						isSubmitSuccessful
							? isEditing
								? " Product updated successfully!"
								: "Product added successfully!"
							: null
					}
				/>

				<HookFormField<ProductFormValues>
					name="title"
					label="Product name"
					placeholder="Enter product name"
				/>

				<HookFormTextarea<ProductFormValues>
					name="description"
					label="Product description"
					rows={5}
					placeholder="Enter product description"
				/>

				<HookFormField<ProductFormValues>
					name="price"
					label="Price"
					type="number"
					placeholder="0.00"
				/>

				<HookFormField<ProductFormValues>
					name="imageUrl"
					label="URL of the product image"
					type="url"
					placeholder="https://example.com/image.jpg"
				/>

				{showImagePreview && (
					<div className="mt-2">
						<p className="mb-1 text-sm text-gray-500">Preview:</p>
						<div className="relative h-32 w-32 overflow-hidden rounded-md border">
							<Image
								src={imageUrl}
								alt="Product Image"
								fill
								sizes="128px"
								className="object-cover"
							/>
						</div>
					</div>
				)}

				<HookFormField<ProductFormValues>
					name="originalStoreLink"
					label="Link to the original store"
					type="url"
					placeholder="https://example.com/original-product-link"
				/>

				<div className="space-y-2">
					<label className="block text-sm font-medium text-gray-700">
						Product categories
					</label>
					<div className="space-y-2">
						{categories.map((category) => (
							<label
								key={category.type}
								className="flex items-center"
							>
								<input
									type="checkbox"
									checked={selectedCategories.includes(category.type)}
									onChange={() => handleCategoryToggle(category.type)}
									className="h-4 w-4 rounded border-gray-300 text-blue-600"
								/>
								<span className="ml-2">{category.name}</span>
							</label>
						))}
					</div>
					{errors.categoryTypes && (
						<p className="mt-1 text-sm text-red-600">
							{errors.categoryTypes.message as string}
						</p>
					)}
				</div>

				{selectedCategories.length > 0 && (
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700"></label>
						<div className="max-h-60 space-y-2 overflow-y-auto rounded-md border p-3">
							{categories
								.filter((cat) =>
									selectedCategories.includes(cat.type),
								)
								.map((category) => (
									<div key={category.type} className="mb-3">
										<h4 className="mb-1 font-medium">
											{category.name}
										</h4>
										<div className="ml-4 space-y-1">
											{category.subcategories?.length ? (
												category.subcategories.map((subcategory) => (
													<label
														key={subcategory.id}
														className="flex items-center"
													>
														<input
															type="checkbox"
															checked={(
																getValues("subcategoryIds") || []
															).includes(subcategory.id)}
															onChange={() =>
																handleSubcategoryToggle(
																	subcategory.id,
																)
															}
															className="h-4 w-4 rounded border-gray-300 text-blue-600"
														/>
														<span className="ml-2 text-sm">
															{subcategory.name}
														</span>
													</label>
												))
											) : (
												<p className="text-sm text-gray-500">
													No subcategories available
												</p>
											)}
										</div>
									</div>
								))}
						</div>
					</div>
				)}

				<div className="flex justify-end space-x-3 pt-4">
					<button
						type="button"
						onClick={() => router.back()}
						className="rounded-md border border-gray-300 px-4 py-2 text-gray-700"
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
	);
}
