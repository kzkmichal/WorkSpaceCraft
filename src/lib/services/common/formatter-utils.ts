import { User } from "@prisma/client";
import { WithTimestamps } from "./types";

export const formatDates = <T extends WithTimestamps>(obj: T) => ({
	...obj,
	createdAt: obj.createdAt.toISOString(),
	updatedAt: obj.updatedAt.toISOString(),
});

export const formatUser = (user: User) => ({
	...user,
	...formatDates(user),
	emailVerified: user.emailVerified?.toISOString() ?? undefined,
	image: user.image ?? undefined,
	role: user.role as "USER" | "ADMIN",
	bio: user.bio ?? undefined,
});
