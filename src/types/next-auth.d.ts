import { UserRole } from "@prisma/client";
import "next-auth";

declare module "@auth/core/adapters" {
	interface AdapterUser {
		role?: UserRole;
	}
}

declare module "next-auth" {
	interface User {
		id: string;
		name: string;
		email: string;
		image?: string;
		role?: UserRole;
	}

	interface Session {
		user: User;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		role: UserRole;
	}
}
