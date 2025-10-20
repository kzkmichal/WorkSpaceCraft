"use server";

import { auth } from "@/lib/auth";
import { getSetupService } from "@/lib/services/setupService/setup-service-factory";
import {
	createSetupSchema,
	SETUP_ERRORS,
	updateSetupSchema,
} from "@/lib/validations/setup";
import { revalidatePath } from "next/cache";

export type SetupResult = {
	success: boolean;
	error?: string;
	setupId?: string;
};

export async function createSetup(
	data: unknown,
): Promise<SetupResult> {
	const session = await auth();

	if (!session) {
		return { success: false, error: SETUP_ERRORS.UNAUTHORIZED };
	}

	try {
		const validated = createSetupSchema.parse(data);
		const setupService = getSetupService();

		const result = await setupService.createSetup(
			session.user.id as string,
			validated.category,
			validated.title,
			validated.description ?? undefined,
			validated.imageUrl ?? undefined,
		);

		revalidatePath(`/setups`);
		revalidatePath("/profile");

		return { success: true, setupId: result.id };
	} catch (error) {
		console.error("Error creating setup:", error);
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: SETUP_ERRORS.FAILED_TO_CREATE,
		};
	}
}

export async function updateSetup(
	setupId: string,
	data: unknown,
): Promise<SetupResult> {
	const session = await auth();

	if (!session) {
		return { success: false, error: SETUP_ERRORS.UNAUTHORIZED };
	}

	try {
		const validated = updateSetupSchema.parse(data);
		const setupService = getSetupService();

		await setupService.updateSetup(
			setupId,
			session.user.id as string,
			validated.title,
			validated.description,
			validated.imageUrl,
			validated.status,
		);

		revalidatePath("/setup", "layout");
		revalidatePath("/profile");

		return { success: true, setupId };
	} catch (error) {
		console.error("Error updating setup:", error);
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: SETUP_ERRORS.FAILED_TO_UPDATE,
		};
	}
}

export async function deleteSetup(
	setupId: string,
): Promise<SetupResult> {
	const session = await auth();

	if (!session) {
		return { success: false, error: SETUP_ERRORS.UNAUTHORIZED };
	}

	try {
		const setupService = getSetupService();
		await setupService.deleteSetup(
			setupId,
			session.user.id as string,
		);

		revalidatePath(`/setups`);
		revalidatePath("/profile");

		return { success: true, setupId };
	} catch (error) {
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: SETUP_ERRORS.FAILED_TO_UPDATE,
		};
	}
}

export async function addProductToSetup(
	setupId: string,
	productId: string,
): Promise<SetupResult> {
	const session = await auth();
	if (!session)
		return { success: false, error: SETUP_ERRORS.UNAUTHORIZED };

	try {
		const setupService = getSetupService();
		await setupService.addProductToSetup(
			setupId,
			productId,
			session.user.id as string,
		);

		revalidatePath("/setup", "layout");
		return { success: true };
	} catch (error) {
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: "Failed to add product",
		};
	}
}

export async function removeProductFromSetup(
	setupId: string,
	productId: string,
): Promise<SetupResult> {
	const session = await auth();
	if (!session)
		return { success: false, error: SETUP_ERRORS.UNAUTHORIZED };

	try {
		const setupService = getSetupService();
		await setupService.removeProductFromSetup(
			setupId,
			productId,
			session.user.id as string,
		);

		revalidatePath("/setup", "layout");

		return { success: true };
	} catch (error) {
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: "Failed to remove product",
		};
	}
}

export async function reorderSetupProducts(
	setupId: string,
	productOrders: Array<{ productId: string; order: number }>,
): Promise<SetupResult> {
	const session = await auth();
	if (!session)
		return { success: false, error: SETUP_ERRORS.UNAUTHORIZED };

	try {
		const setupService = getSetupService();
		await setupService.reorderSetupProducts(
			setupId,
			productOrders,
			session.user.id as string,
		);

		revalidatePath("/setup", "layout");

		return { success: true };
	} catch (error) {
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: "Failed to reorder products",
		};
	}
}

export async function publishSetup(
	setupId: string,
): Promise<SetupResult> {
	const session = await auth();
	if (!session)
		return { success: false, error: SETUP_ERRORS.UNAUTHORIZED };

	try {
		const setupService = getSetupService();
		await setupService.publishSetup(
			setupId,
			session.user.id as string,
		);

		revalidatePath("/setup", "layout");
		revalidatePath("/setups");
		revalidatePath("/profile");

		return { success: true, setupId };
	} catch (error) {
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: "Failed to publish setup",
		};
	}
}

export async function toggleProductInSetup(
	setupId: string,
	productId: string,
): Promise<SetupResult> {
	const session = await auth();
	if (!session)
		return { success: false, error: SETUP_ERRORS.UNAUTHORIZED };

	try {
		const setupService = getSetupService();
		const isInSetup = await setupService.isProductInSetup(
			setupId,
			productId,
		);

		if (isInSetup) {
			await setupService.removeProductFromSetup(
				setupId,
				productId,
				session.user.id as string,
			);
		} else {
			await setupService.addProductToSetup(
				setupId,
				productId,
				session.user.id as string,
			);
		}

		revalidatePath("/setup", "layout");

		return { success: true };
	} catch (error) {
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: "Failed to toggle product",
		};
	}
}
