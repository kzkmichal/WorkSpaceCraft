"use server";

import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma/prisma";

export async function updateUserRole(userId: string, role: UserRole) {
	const session = await auth();

	if (!session || session.user.role !== "ADMIN") {
		throw new Error("Unauthorized");
	}

	try {
		if (role !== UserRole.ADMIN && role !== "USER") {
			throw new Error("Invalid role");
		}

		await prisma.user.update({
			where: { id: userId },
			data: { role: role },
		});

		revalidatePath("/admin/users");

		return { success: true };
	} catch (error) {
		console.error("Error updating user role:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

export async function moderateProduct(
	productId: string,
	action: string,
) {
	const session = await auth();

	if (!session || session.user.role !== "ADMIN") {
		throw new Error("Unauthorized");
	}

	try {
		let updateData = {};

		if (action === "APPROVE") {
			updateData = {
				isReported: false,
				reportCount: 0,
				reportReason: null,
				moderatedBy: session.user.id,
				moderatedAt: new Date(),
			};
		} else if (action === "REMOVE") {
			updateData = {
				isReported: false,
				isDeleted: true,
				moderatedBy: session.user.id,
				moderatedAt: new Date(),
			};
		} else {
			throw new Error("Invalid action");
		}

		await prisma.product.update({
			where: { id: productId },
			data: updateData,
		});

		revalidatePath("/admin/products");

		return { success: true };
	} catch (error) {
		console.error("Error moderating product:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}
