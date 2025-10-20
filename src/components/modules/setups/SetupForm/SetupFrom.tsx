"use client";

import {
	CreateSetupInput,
	setupSchema,
	UpdateSetupInput,
	type SetupFormValues,
} from "@/lib/validations/setup";
import { SetupFormProps } from "./types";
import {
	useForm,
	FormProvider,
	SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createSetup, updateSetup } from "@/app/actions/setup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	HookFormField,
	HookFormTextarea,
} from "@/components/common/molecules/Form";
import { Badge } from "@/components/ui/badge";
import {
	getCategoryIcon,
	getCategoryLabel,
} from "../../User/Components/UserSetups/utils";
import { ImageUpload } from "../../Products/ProductForm/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { UnsavedChangesDialog } from "./UnsavedChangesDialog";

export const SetupForm = ({
	category,
	setup,
	isEditing,
}: SetupFormProps) => {
	const form = useForm<SetupFormValues>({
		resolver: zodResolver(setupSchema),
		defaultValues: {
			category: setup?.category || category,
			title: setup?.title || "",
			description: setup?.description || undefined,
			imageUrl: setup?.imageUrl || undefined,
		},
	});

	const router = useRouter();
	const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);

	const {
		handleSubmit,
		watch,
		setValue,
		getValues,
		formState: {
			errors,
			isSubmitting,
			isSubmitSuccessful,
			isDirty,
			isValid,
		},
	} = form;

	const title = watch("title");
	const description = watch("description");
	const imageUrl = watch("imageUrl");

	const onSubmit: SubmitHandler<SetupFormValues> = async (data) => {
		try {
			let result;

			if (isEditing && setup?.id) {
				const updateData: UpdateSetupInput = {
					title: data.title,
					description: data.description,
					imageUrl: data.imageUrl,
				};
				result = await updateSetup(setup.id, updateData);
			} else {
				const createData: CreateSetupInput = {
					category: data.category,
					title: data.title,
					description: data.description,
					imageUrl: data.imageUrl,
				};
				result = await createSetup(createData);
			}

			const categoryUrl = category.toLowerCase().replace("_", "-");

			if (result.success) {
				toast.success(
					isEditing ? "Setup updated!" : "Setup created!",
				);
				if (isEditing) {
					router.push(`/setup/${categoryUrl}/${setup?.id}`);
				} else {
					router.push(`/setup/${categoryUrl}/${result.setupId}/edit`);
				}
				router.refresh();
			} else {
				toast.error(result.error);
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			toast.error("An unexpected error occurred. Please try again.");
		}
	};

	const handleCancel = () => {
		if (isDirty) {
			setShowUnsavedDialog(true);
		} else {
			router.back();
		}
	};

	const handleDiscard = () => {
		setShowUnsavedDialog(false);
		router.back();
	};

	const handleSaveAndLeave = async () => {
		await handleSubmit(onSubmit)();
		setShowUnsavedDialog(false);
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
							<div className="mb-2 flex items-center justify-center gap-3">
								<h1 className="text-3xl font-bold text-foreground">
									{isEditing ? "Edit" : "Create"}{" "}
									{getCategoryLabel(category)} Setup
								</h1>
								<Badge variant="outline" className="text-base">
									{getCategoryIcon(category)}{" "}
									{getCategoryLabel(category)}
								</Badge>
							</div>
							<p className="text-muted-foreground">
								{isEditing
									? "Update your setup information"
									: "Showcase your workspace setup"}
							</p>
						</div>
						<div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
							<div className="border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5 px-6 py-4">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
										<span className="text-lg">🏠</span>
									</div>
									<div>
										<h3 className="text-xl font-semibold text-foreground">
											Basic Information
										</h3>
										<p className="text-sm text-muted-foreground">
											Tell us about your setup
										</p>
									</div>
								</div>
							</div>
							<div className="space-y-6 p-6">
								<div className="space-y-2">
									<HookFormField<SetupFormValues>
										name="title"
										label="Setup Title"
										placeholder="My Minimal Home Office"
									/>
									<div className="flex justify-between text-xs text-muted-foreground">
										<span>Give your setup a descriptive name</span>
										<span
											className={
												title.length < 5 || title.length > 100
													? "text-destructive"
													: ""
											}
										>
											{title.length}/100
										</span>
									</div>
									{errors.title && (
										<p className="text-sm text-destructive">
											{errors.title.message}
										</p>
									)}
								</div>
								<div className="space-y-2">
									<HookFormTextarea<SetupFormValues>
										name="description"
										label="Description"
										placeholder="Describe your workspace setup in detail..."
										rows={5}
									/>
									<div className="flex justify-between text-xs text-muted-foreground">
										<span>
											Optional - Add details about your setup
										</span>
										{description && (
											<span
												className={
													description.length > 1000
														? "text-destructive"
														: ""
												}
											>
												{description.length}/1000
											</span>
										)}
									</div>
									{errors.description && (
										<p className="text-sm text-destructive">
											{errors.description.message}
										</p>
									)}
								</div>
								<div className="space-y-2">
									<label className="block text-sm font-medium text-foreground">
										Setup Image
									</label>
									<ImageUpload
										images={
											imageUrl
												? [{ url: imageUrl, isPrimary: true }]
												: []
										}
										onChange={(images) =>
											setValue("imageUrl", images[0]?.url || null, {
												shouldDirty: true,
											})
										}
										maxImages={1}
									/>
									<p className="text-xs text-muted-foreground">
										Optional - Upload a photo of your workspace (JPG,
										PNG, or WEBP, max 5MB)
									</p>
									{errors.imageUrl && (
										<p className="text-sm text-destructive">
											{errors.imageUrl.message}
										</p>
									)}
								</div>
							</div>
						</div>
						<div className="flex justify-end space-x-4 rounded-xl border-t border-border bg-muted/20 px-6 py-4">
							<Button
								type="button"
								variant="outline"
								onClick={handleCancel}
								disabled={isSubmitting}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting
									? "Saving..."
									: isEditing
										? "Save Changes"
										: "Create Setup"}
							</Button>
						</div>
					</form>
				</FormProvider>
				<UnsavedChangesDialog
					open={showUnsavedDialog}
					onOpenChange={setShowUnsavedDialog}
					onDiscard={handleDiscard}
					onSave={handleSaveAndLeave}
				/>
			</div>
		</div>
	);
};
