"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import { ProductFormProps, ProductValues } from "./types";
import {
	createProduct,
	updateProduct,
	type ProductFormData,
} from "@/app/actions/product";

export function ProductForm({
	categories,
	product,
	isEditing = false,
}: ProductFormProps) {
	const router = useRouter();
	const [formState, setFormState] = useState<ProductValues>({
		title: product?.title || "",
		description: product?.description || "",
		price: product?.price || 0,
		imageUrl:
			product?.imageUrl ||
			"https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		originalStoreLink: product?.originalStoreLink || "",
		categoryTypes: product?.categoryTypes || [],
		subcategoryIds: product?.subcategoryIds || [],
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const validate = () => {
		const newErrors: Record<string, string> = {};

		if (!formState.title.trim()) {
			newErrors.title = "Title is required";
		}

		if (!formState.description.trim()) {
			newErrors.description = "Description is required";
		}

		if (formState.price <= 0) {
			newErrors.price = "Price must be greater than 0";
		}

		if (!formState.imageUrl.trim()) {
			newErrors.imageUrl = "Image URL is required";
		}

		if (!formState.originalStoreLink.trim()) {
			newErrors.originalStoreLink = "Original store link is required";
		}

		if (formState.categoryTypes.length === 0) {
			newErrors.categoryTypes =
				"At least one category must be selected";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validate()) {
			return;
		}

		setIsSubmitting(true);
		setSubmitError(null);

		try {
			const formData: ProductFormData = {
				...formState,
				price: Number(formState.price),
			};

			let result;

			if (isEditing && product?.id) {
				result = await updateProduct(product.id, formData);
			} else {
				result = await createProduct(formData);
			}

			if (result.success) {
				router.push(
					isEditing ? `/products/${result.productId}` : "/profile",
				);
				router.refresh();
			} else {
				setSubmitError(
					result.error ||
						"There was an error processing your request",
				);
			}
		} catch (error) {
			console.error("Error submitting product:", error);
			setSubmitError(
				"An unexpected error occurred. Please try again.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

	const handleNumberChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const { name, value } = e.target;
		setFormState((prev) => ({
			...prev,
			[name]: parseFloat(value) || 0,
		}));
	};

	const handleCategoryToggle = (categoryType: string) => {
		setFormState((prev) => {
			const categoryTypes = [...prev.categoryTypes];
			const index = categoryTypes.indexOf(categoryType);

			if (index > -1) {
				categoryTypes.splice(index, 1);
			} else {
				categoryTypes.push(categoryType);
			}

			return { ...prev, categoryTypes };
		});
	};

	const handleSubcategoryToggle = (subcategoryId: string) => {
		setFormState((prev) => {
			const subcategoryIds = [...prev.subcategoryIds];
			const index = subcategoryIds.indexOf(subcategoryId);

			if (index > -1) {
				subcategoryIds.splice(index, 1);
			} else {
				subcategoryIds.push(subcategoryId);
			}

			return { ...prev, subcategoryIds };
		});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{submitError && (
				<div className="rounded-md bg-red-50 p-4 text-red-600">
					{submitError}
				</div>
			)}

			<div>
				<label className="mb-1 block text-sm font-medium text-gray-700">
					Title
				</label>
				<input
					type="text"
					name="title"
					value={formState.title}
					onChange={handleInputChange}
					className={`mt-1 block w-full rounded-md border ${
						errors.title ? "border-red-500" : "border-gray-300"
					} p-2 shadow-sm`}
				/>
				{errors.title && (
					<p className="mt-1 text-sm text-red-600">{errors.title}</p>
				)}
			</div>

			<div>
				<label className="mb-1 block text-sm font-medium text-gray-700">
					Description
				</label>
				<textarea
					name="description"
					value={formState.description}
					onChange={handleInputChange}
					rows={5}
					className={`mt-1 block w-full rounded-md border ${
						errors.description ? "border-red-500" : "border-gray-300"
					} p-2 shadow-sm`}
				/>
				{errors.description && (
					<p className="mt-1 text-sm text-red-600">
						{errors.description}
					</p>
				)}
			</div>

			<div>
				<label className="mb-1 block text-sm font-medium text-gray-700">
					Price
				</label>
				<input
					type="number"
					name="price"
					min="0.01"
					step="0.01"
					value={formState.price}
					onChange={handleNumberChange}
					className={`mt-1 block w-full rounded-md border ${
						errors.price ? "border-red-500" : "border-gray-300"
					} p-2 shadow-sm`}
				/>
				{errors.price && (
					<p className="mt-1 text-sm text-red-600">{errors.price}</p>
				)}
			</div>

			{/* <div>
				<label className="mb-1 block text-sm font-medium text-gray-700">
					Image URL
				</label>
				<input
					type="url"
					name="imageUrl"
					value={formState.imageUrl}
					onChange={handleInputChange}
					className={`mt-1 block w-full rounded-md border ${
						errors.imageUrl ? "border-red-500" : "border-gray-300"
					} p-2 shadow-sm`}
				/>
				{errors.imageUrl && (
					<p className="mt-1 text-sm text-red-600">
						{errors.imageUrl}
					</p>
				)}
				{formState.imageUrl && (
					<div className="mt-2">
						<p className="mb-1 text-sm text-gray-500">Preview:</p>
						{formState.imageUrl && (
							<Image
								src={formState.imageUrl}
								alt="Product preview"
								className="h-32 w-32 rounded-md object-cover"
							/>
						)}
					</div>
				)}
			</div> */}

			<div>
				<label className="mb-1 block text-sm font-medium text-gray-700">
					Original Store Link
				</label>
				<input
					type="url"
					name="originalStoreLink"
					value={formState.originalStoreLink}
					onChange={handleInputChange}
					className={`mt-1 block w-full rounded-md border ${
						errors.originalStoreLink
							? "border-red-500"
							: "border-gray-300"
					} p-2 shadow-sm`}
				/>
				{errors.originalStoreLink && (
					<p className="mt-1 text-sm text-red-600">
						{errors.originalStoreLink}
					</p>
				)}
			</div>

			<div>
				<label className="mb-2 block text-sm font-medium text-gray-700">
					Categories
				</label>
				<div className="space-y-2">
					{categories.map((category) => (
						<label key={category.type} className="flex items-center">
							<input
								type="checkbox"
								checked={formState.categoryTypes.includes(
									category.type,
								)}
								onChange={() => handleCategoryToggle(category.type)}
								className="h-4 w-4 rounded border-gray-300 text-blue-600"
							/>
							<span className="ml-2">{category.name}</span>
						</label>
					))}
				</div>
				{errors.categoryTypes && (
					<p className="mt-1 text-sm text-red-600">
						{errors.categoryTypes}
					</p>
				)}
			</div>

			<div>
				<label className="mb-2 block text-sm font-medium text-gray-700">
					Subcategories
				</label>
				<div className="max-h-60 space-y-2 overflow-y-auto rounded-md border p-3">
					{categories
						.filter((cat) =>
							formState.categoryTypes.includes(cat.type),
						)
						.map((category) => (
							<div key={category.type} className="mb-3">
								<h4 className="mb-1 font-medium">{category.name}</h4>
								<div className="ml-4 space-y-1">
									{category.subcategories?.map((subcategory) => (
										<label
											key={subcategory.id}
											className="flex items-center"
										>
											<input
												type="checkbox"
												checked={formState.subcategoryIds.includes(
													subcategory.id,
												)}
												onChange={() =>
													handleSubcategoryToggle(subcategory.id)
												}
												className="h-4 w-4 rounded border-gray-300 text-blue-600"
											/>
											<span className="ml-2">{subcategory.name}</span>
										</label>
									))}
									{!category.subcategories?.length && (
										<p className="text-sm text-gray-500">
											No subcategories available
										</p>
									)}
								</div>
							</div>
						))}
					{!formState.categoryTypes.length && (
						<p className="text-sm text-gray-500">
							Select at least one category to see subcategories
						</p>
					)}
				</div>
			</div>

			<div className="flex justify-end space-x-3 pt-4">
				<button
					type="button"
					onClick={() => router.back()}
					className="rounded-md border border-gray-300 px-4 py-2 text-gray-700"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={isSubmitting}
					className="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
				>
					{isSubmitting
						? isEditing
							? "Updating..."
							: "Creating..."
						: isEditing
							? "Update Product"
							: "Create Product"}
				</button>
			</div>
		</form>
	);
}
