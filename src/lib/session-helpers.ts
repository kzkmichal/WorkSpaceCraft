import { auth } from "./auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
	const session = await auth();

	if (!session || !session.user?.id) {
		redirect("/auth/signin");
	}

	return session;
}

export async function requireAdmin() {
	const session = await requireAuth();

	if (session.user.role !== "ADMIN") {
		redirect("/?access=denied");
	}

	return session;
}

export async function getOptionalAuth() {
	return await auth();
}

export async function checkResourceOwnership(resourceUserId: string) {
	const session = await requireAuth();
	const isOwner = session.user.id === resourceUserId;
	const isAdmin = session.user.role === "ADMIN";

	return {
		session,
		isOwner,
		isAdmin,
		canEdit: isOwner || isAdmin,
	};
}

export function getUserFromHeaders(headers: Headers) {
	const userId = headers.get("x-user-id");
	const userRole = headers.get("x-user-role");
	const userEmail = headers.get("x-user-email");

	if (!userId || !userRole) {
		return null;
	}

	return {
		id: userId,
		role: userRole,
		email: userEmail,
	};
}
