"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Trash2, UploadCloud, CheckCircle2 } from "lucide-react";
import { ImageUploadProps } from "./types";
import { cn } from "@/components/utils/helpers";

export function ImageUpload({
	images,
	onChange,
	maxImages = 5,
}: ImageUploadProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [uploadError, setUploadError] = useState<string | null>(null);

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			if (images.length + acceptedFiles.length > maxImages) {
				setUploadError(
					`You can only upload up to ${maxImages} images.`,
				);
				return;
			}

			setIsUploading(true);
			setUploadError(null);

			try {
				const newImages = await Promise.all(
					acceptedFiles.map(async (file) => {
						const formData = new FormData();
						formData.append("file", file);

						const response = await fetch("/api/upload", {
							method: "POST",
							body: formData,
						});

						if (!response.ok) {
							throw new Error("Upload failed");
						}

						const data = (await response.json()) as {
							url: string;
							fileName?: string;
							publicId?: string;
						};

						return {
							url: data.url,
							fileName: data.fileName || file.name,
							isPrimary: false,
						};
					}),
				);

				if (images.length === 0 && newImages.length > 0) {
					newImages[0].isPrimary = true;
				}

				onChange([...images, ...newImages]);
			} catch (error) {
				console.error("Upload error:", error);
				setUploadError("Failed to upload images. Please try again.");
			} finally {
				setIsUploading(false);
			}
		},
		[images, maxImages, onChange],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".jpeg", ".jpg", ".png", ".webp"],
		},
		maxSize: 5 * 1024 * 1024, // 5MB
		disabled: isUploading || images.length >= maxImages,
	});

	const handleRemoveImage = (index: number) => {
		const newImages = [...images];
		const removedImage = newImages.splice(index, 1)[0];

		if (removedImage.isPrimary && newImages.length > 0) {
			newImages[0].isPrimary = true;
		}

		onChange(newImages);
	};

	const handleSetPrimary = (index: number) => {
		const newImages = images.map((image, i) => ({
			...image,
			isPrimary: i === index,
		}));
		onChange(newImages);
	};

	return (
		<div className="space-y-4">
			<div
				{...getRootProps()}
				className={cn(
					"cursor-pointer rounded-md border-2 border-dashed p-6 text-center transition-colors hover:bg-gray-50",
					isDragActive
						? "border-blue-500 bg-blue-50"
						: "border-gray-300",
					(isUploading || images.length >= maxImages) &&
						"cursor-not-allowed opacity-50",
				)}
			>
				<input {...getInputProps()} />
				<UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
				<p className="mt-2 text-sm text-gray-600">
					{isDragActive
						? "Drop the files here..."
						: `Drag and drop images, or click to select (${images.length}/${maxImages})`}
				</p>
				{isUploading && (
					<p className="mt-1 text-sm text-blue-500">Uploading...</p>
				)}
				{images.length >= maxImages && (
					<p className="mt-1 text-sm text-amber-500">
						Maximum number of images reached.
					</p>
				)}
			</div>

			{uploadError && (
				<p className="text-sm text-red-600">{uploadError}</p>
			)}

			{images.length > 0 && (
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
					{images.map((image, index) => (
						<div
							key={image.url}
							className={cn(
								"group relative overflow-hidden rounded-md border",
								image.isPrimary && "ring-2 ring-blue-500",
							)}
						>
							<div className="relative aspect-square w-full">
								<Image
									src={image.url}
									alt={image.fileName || `Product image ${index + 1}`}
									fill
									sizes="(max-width: 768px) 50vw, 33vw"
									className="object-cover"
								/>
							</div>

							<div className="absolute inset-0 flex items-center justify-center gap-2 bg-black bg-opacity-0 opacity-0 transition-opacity group-hover:bg-opacity-40 group-hover:opacity-100">
								{!image.isPrimary && (
									<button
										type="button"
										onClick={() => handleSetPrimary(index)}
										className="rounded-full bg-green-500 p-1 text-white"
										title="Set as primary image"
									>
										<CheckCircle2 size={18} />
									</button>
								)}
								<button
									type="button"
									onClick={() => handleRemoveImage(index)}
									className="rounded-full bg-red-500 p-1 text-white"
									title="Remove image"
								>
									<Trash2 size={18} />
								</button>
							</div>

							{image.isPrimary && (
								<div className="absolute right-1 top-1 rounded bg-blue-500 px-1 py-0.5 text-xs text-white">
									Primary
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
