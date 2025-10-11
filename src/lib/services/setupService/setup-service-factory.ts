import { prisma } from "@/lib/prisma/prisma";
import { SetupService } from "./setup-service";

export const getSetupService = (): SetupService => {
	let setupServiceInstance: SetupService | null = null;

	if (setupServiceInstance === null) {
		setupServiceInstance = new SetupService(prisma);
	}

	return setupServiceInstance;
};

export const setupService = getSetupService();
